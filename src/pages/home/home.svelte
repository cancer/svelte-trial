<script>
  import { onMount } from 'svelte';

  import { login } from '../shared/login';
  import { mapClasses } from '../shared/map-classes';
  import { fetchBooks } from './fetch-books';
  import {
    books,
    bookCount,
    visibility,
    isVisibleAll,
    isVisibleOnlyIgnored,
    isVisibleOnlyNotIgnored,
  } from './home.store';
  import type { Visibility } from './home.store';

  onMount(async () => {
    //await login();
    await fetchBooks();
  });

  const changeVisibilityTo = (value: Visibility) => {
    return () => {
      visibility.set(value);
    };
  };
</script>

<h2 class="title is-1">本棚</h2>
<h3 class="subtitle is-5">所持している本（全{$bookCount}冊）の一覧です。</h3>

<div class="block">
  <input
    on:change|preventDefault={changeVisibilityTo('all')}
    checked={$isVisibleAll}
    type="radio"
    value="all"
  />
  <input
    on:change|preventDefault={changeVisibilityTo('onlyIgnored')}
    checked={$isVisibleOnlyIgnored}
    type="radio"
    value="onlyIgnored"
  />
  <input
    on:change|preventDefault={changeVisibilityTo('onlyNotIgnored')}
    checked={$isVisibleOnlyNotIgnored}
    type="radio"
    value="onlyNotIgnored"
  />
</div>

<ul
  class={mapClasses({
    '-all': $isVisibleAll,
    '-onlyIgnored': $isVisibleOnlyIgnored,
    '-notOnlyIgnored': $isVisibleOnlyNotIgnored,
  })}
>
  {#each $books as book (book.asin)}
    <li class={`Books_Item ${book.ignored ? '-ignored' : ''}`}>
      <a class="Books_Link" href={book.detailPageUrl}>
        <img class="Books_Img" src={book.productUrl} loading="lazy" alt="" />
        <span class="Books_Title">{book.title}</span>
      </a>
    </li>
  {/each}
</ul>

<style lang="scss">
  @import '~bulma/sass/utilities/_all';

  .Books {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
    gap: 15px;
    &_Item {
      position: relative;
      transition: 0.5s filter $easing;
      &.-ignored {
        filter: grayscale(1);
        opacity: 0.8;
      }
      // "通知設定あり"のみを表示：通知設定あり要素を表示
      .-notOnlyIgnored &:not(.-ignored) {
        display: block;
      }
      // "通知設定あり"のみを表示：通知設定なし要素を非表示
      .-notOnlyIgnored &.-ignored {
        display: none;
      }
      // "通知設定なし"のみを表示：通知設定なし要素を表示
      .-onlyIgnored &.-ignored {
        display: block;
      }
      // "通知設定なし"のみを表示：通知設定あり素を表示
      .-onlyIgnored &:not(.-ignored) {
        display: none;
      }
    }
    &_Link {
      display: block;
      &:hover {
        color: $cyan;
      }
    }
    &_Title {
      display: block;
      margin-top: 10px;
      font-size: 14px;
      line-height: 1.3;
      word-break: break-all;
    }
    &_Img {
      width: 100%;
      height: 150px;
      object-fit: cover;
      background-color: $white-ter;
    }
    &_Button {
      -webkit-appearance: none;
      position: absolute;
      top: 115px;
      right: 5px;
      width: 30px;
      height: 30px;
      padding: 0;
      border: 0;
      background: transparent;
      color: $yellow;
      cursor: pointer;
      transition: 0.2s color $easing;
      &:hover {
        color: lighten($yellow, 20%);
      }
      .icon {
        font-size: 20px;
        width: 30px;
        height: 30px;
        color: inherit;
        text-shadow: 0 0 3px #000;
      }
    }
    &_ButtonText {
      position: absolute !important;
      clip: rect(1px, 1px, 1px, 1px);
      padding: 0 !important;
      border: 0 !important;
      height: 1px !important;
      width: 1px !important;
      overflow: hidden;
    }
  }
</style>

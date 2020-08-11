<script lang="ts">
  import { onMount } from "svelte";

  import Dummy from "../dummy.svelte";
  import { fetchBooks } from "./home.usecase";
  import { VisibilityLiteral } from "./home.store";
  import {
    books,
    bookCount,
    visibility,
    Visibility,
    isVisibleAll,
    isVisibleOnlyIgnored,
    isVisibleOnlyNotIgnored,
  } from "./home.store";

  onMount(async () => {
    await fetchBooks();
  });

  const changeVisibilityTo = (value: VisibilityLiteral) => {
    return () => {
      visibility.set(value);
    };
  };
</script>

<h2 class="title">本棚</h2>
<h3 class="subtitle is-5">所持している本（全{$bookCount}冊）の一覧です。</h3>

<div class="block">
  <label class="radio">
    <input
      on:change|preventDefault={changeVisibilityTo('all')}
      bind:group={$visibility}
      value={Visibility.All}
      type="radio"
    />
    <span class="check" />
    <span class="control-label">すべて</span>
  </label>
  <label class="radio">
    <input
      on:change|preventDefault={changeVisibilityTo('onlyIgnored')}
      bind:group={$visibility}
      value={Visibility.OnlyIgnored}
      type="radio"
    />
    <span class="check" />
    <span class="control-label">通知設定あり</span>
  </label>
  <label class="radio">
    <input
      on:change|preventDefault={changeVisibilityTo('onlyNotIgnored')}
      bind:group={$visibility}
      value={Visibility.OnlyNotIgnored}
      type="radio"
    />
    <span class="check" />
    <span class="control-label">通知設定なし</span>
  </label>
</div>

<input bind:value={$isVisibleAll} />

<ul
  class="Books"
  class:-all={$isVisibleAll}
  class:-onlyIgnored={$isVisibleOnlyIgnored}
  class:-notOnlyIgnored={$isVisibleOnlyNotIgnored}
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

<Dummy />

<style lang="scss">
  .title {
    color: #363636;
    font-size: 3rem;
    font-weight: 600;
    line-height: 1.125;
  }
  .subtitle {
    color: #4a4a4a;
    font-size: 1.25rem;
    font-weight: 400;
    line-height: 1.25;
    margin-bottom: 1.5rem;
    margin-top: -1.25rem;
  }
  .block {
    margin-bottom: 1.5rem;
  }
  label {
    .radio {
      cursor: pointer;
      line-height: 1.25;
      position: relative;
      outline: none;
      display: inline-flex;
      align-items: center;
      user-select: none;
    }
  }
  .radio {
    input[type="radio"] {
      cursor: pointer;
      vertical-align: baseline;
      position: absolute;
      left: 0;
      opacity: 0;
      outline: none;
      z-index: -1;

      &:checked + .check {
        border-color: #00d1b2;
        &:before {
          transform: scale(0.5);
        }
      }
    }
    .check {
      display: flex;
      flex-shrink: 0;
      position: relative;
      cursor: pointer;
      width: 1.25em;
      height: 1.25em;
      transition: background 150ms ease-out;
      border-radius: 50%;
      border: 2px solid #7a7a7a;
      &:before {
        content: "";
        display: flex;
        position: absolute;
        left: 50%;
        margin-left: calc(-1.25em / 2);
        bottom: 50%;
        margin-bottom: calc(-1.25em / 2);
        width: 1.25em;
        height: 1.25em;
        transition: transform 150ms ease-out;
        border-radius: 50%;
        transform: scale(0);
        background-color: #00d1b2;
      }
    }
    .control-label {
      padding-left: 0.5em;
    }
  }
  .Books {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
    gap: 15px;
    &_Item {
      position: relative;
      transition: 0.5s filter ease-out;
      &.-ignored {
        filter: grayscale(1);
        opacity: 0.8;
      }
      /* "通知設定あり"のみを表示：通知設定あり要素を表示 */
      .-notOnlyIgnored &:not(.-ignored) {
        display: block;
      }
      /* "通知設定あり"のみを表示：通知設定なし要素を非表示 */
      .-notOnlyIgnored &.-ignored {
        display: none;
      }
      /* "通知設定なし"のみを表示：通知設定なし要素を表示 */
      .-onlyIgnored &.-ignored {
        display: block;
      }
      /* "通知設定なし"のみを表示：通知設定あり素を表示 */
      .-onlyIgnored &:not(.-ignored) {
        display: none;
      }
    }
    &_Link {
      display: block;
      &:hover {
        color: hsl(204, 71%, 53%);
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
      background-color: hsl(0, 0%, 96%);
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
      color: hsl(48, 100%, 67%);
      cursor: pointer;
      transition: 0.2s color ease-out;
      &:hover {
        color: lighten(hsl(48, 100%, 67%), 20%);
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

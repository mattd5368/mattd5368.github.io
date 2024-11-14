<script lang="ts">
  import { sha256 } from "js-sha256";
  import SSSS from "ssss-js";

  import { progress, shamir_check } from "$lib/progress.svelte";

  let code1 = $state("");
  let code2 = $state("");
  let code3 = $state("");
  let code4 = $state("");
  let code5 = $state("");

  const s = new SSSS(5, 0, true);

  const key = $derived.by(() => {
    try {
      const codes = [code1, code2, code3, code4, code5].map((s) => {
        return `${parseInt(s.slice(0, 2), 16)}-${s.slice(2)}`;
      });
      return s.combine(codes);
    } catch (_) {
      return "Huh, something doesn't look quite right";
    }
  });

  const correct = $derived.by(() => {
    const hash = sha256.create();
    hash.update(key);
    return hash.hex() == shamir_check;
  });

  const next = () => {
    if (correct) {
      progress.current = {
        ...progress.current,
        shamir: key,
      };
    }
  };
</script>

<div class="mx-auto w-96">
  <div class="flex flex-col gap-4 p-4">
    <h2 class="mx-auto text-xl">Enter your codes below</h2>

    <input class="input input-bordered" type="text" bind:value={code1} placeholder="Code 1" />
    <input class="input input-bordered" type="text" bind:value={code2} placeholder="Code 2" />
    <input class="input input-bordered" type="text" bind:value={code3} placeholder="Code 3" />
    <input class="input input-bordered" type="text" bind:value={code4} placeholder="Code 4" />
    <input class="input input-bordered" type="text" bind:value={code5} placeholder="Code 5" />

    <h2 class="mx-auto text-xl">The output of your codes is...</h2>

    <pre class="mx-auto text-wrap">{key}</pre>

    {#if correct}
      <h2 class="text-center text-xl">CORRECT!</h2>
      <button class="btn" onclick={next}>Next</button>
    {/if}
  </div>
</div>

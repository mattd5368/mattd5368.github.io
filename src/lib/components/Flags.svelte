<script lang="ts">
  import { sha256 } from "js-sha256";

  import { flags_answer, progress } from "$lib/progress.svelte";

  let aus = $state("");
  let can = $state("");
  let gbr = $state("");
  let usa = $state("");

  const str = $derived(`${aus}${can}${gbr}${usa}`);
  const correct = $derived.by(() => {
    const hash = sha256.create();
    hash.update(str);
    return hash.hex() == flags_answer;
  });

  const next = () => {
    if (correct) {
      progress.current = {
        ...progress.current,
        flags: str,
      };
    }
  };
</script>

<div class="flex flex-col gap-4 p-4">
  <h2 class="mx-auto text-xl">You found some flags?</h2>

  <h3>AUS 🇦🇺</h3>
  <input class="input input-bordered" type="text" bind:value={aus} placeholder="🇦🇺" />
  <h3>CAN 🇨🇦</h3>
  <input class="input input-bordered" type="text" bind:value={can} placeholder="🇨🇦" />
  <h3>GBR 🇬🇧</h3>
  <input class="input input-bordered" type="text" bind:value={gbr} placeholder="🇬🇧" />
  <h3>USA 🇺🇸</h3>
  <input class="input input-bordered" type="text" bind:value={usa} placeholder="🇺🇸" />

  {#if correct}
    <h2 class="text-center text-xl">CORRECT!</h2>
    <button class="btn" onclick={next}>Next</button>
  {/if}
</div>

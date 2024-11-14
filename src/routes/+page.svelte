<script lang="ts">
  import { sha256 } from "js-sha256";

  import Cipher from "$lib/components/Cipher.svelte";
  import Flags from "$lib/components/Flags.svelte";
  import Shamir from "$lib/components/Shamir.svelte";
  import { flags_answer, progress, shamir_check } from "$lib/progress.svelte";

  const flags_done = $derived.by(() => {
    const hash = sha256.create();
    hash.update(progress.current.flags);
    return hash.hex() == flags_answer;
  });

  const shamir_done = $derived.by(() => {
    const hash = sha256.create();
    hash.update(progress.current.shamir);
    return hash.hex() == shamir_check;
  });
</script>

<div class="mx-auto w-96">
  {#if !flags_done}
    <Flags />
  {:else if !shamir_done}
    <Shamir />
  {:else}
    <Cipher />
  {/if}
</div>

<script lang="ts">
  import aesjs from "aes-js";

  import { cipher_text, progress } from "$lib/progress.svelte";

  let show_decrypted = $state(false);

  const decrypted = $derived.by(() => {
    try {
      const aes_key = `${progress.current.shamir}${progress.current.shamir}`;
      const aes = new aesjs.ModeOfOperation.ctr(hexToBytes(aes_key));
      const output = aes.decrypt(hexToBytes(cipher_text));
      return aesjs.utils.utf8.fromBytes(output);
    } catch (_) {
      return "That doesn't look like the right key";
    }
  });

  function hexToBytes(hex: string) {
    let bytes = [];
    for (let c = 0; c < hex.length; c += 2) {
      bytes.push(parseInt(hex.slice(c, c + 2), 16));
    }
    return bytes;
  }

  function hexdump(buffer: string, blockSize: number) {
    var lines = [];
    for (let l = 0; l < buffer.length; l += blockSize) {
      let line = "";
      for (let c = 0; c < blockSize; c += 2) {
        line += buffer.slice(l + c, l + c + 2) + " ";
      }
      lines.push(line);
    }
    return lines.join("\n");
  }
</script>

<div class="flex flex-col gap-4 p-4">
  {#if show_decrypted}
    <pre class="mx-auto text-wrap">{decrypted}</pre>

    <h2 class="text-center text-xl">Congratulations</h2>
  {:else}
    <h2 class="mx-auto text-xl">Below is the cipher text from your sheet</h2>

    <pre class="mx-auto text-wrap">{hexdump(cipher_text, 24)}</pre>

    <button
      class="btn"
      onclick={() => {
        show_decrypted = true;
      }}>Click to Decrypt</button>
  {/if}
</div>

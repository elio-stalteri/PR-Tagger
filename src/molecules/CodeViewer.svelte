<script>
  export let diffHunk = "";
  $: diffSplit = diffHunk.split("\n");
  $: rows = diffSplit.filter((_, idx) => idx !== 0);
  $: rowsNumbers = diffSplit[0]
    .split("@@")[1]
    .trim()
    .split(" ")
    .map(v => Math.abs(parseInt(v.split(",")[0])));
  const RowIdxMapper = (character,array) => {
    var rNumber = -1;
    return array.map(v => {
      if (v.charAt(0) !== character) {
        rNumber++;
        return [`${rowsNumbers[1] + rNumber}`, v.charAt(0)];
      } else {
        return [``, v.charAt(0)];
      }
    });
  }
  $: rowsIdxPositive = RowIdxMapper("-",rows);
  $: rowsIdxNegative = RowIdxMapper("+",rows);;
</script>

<div class="flex">
  <pre class="flex bg-gray-800 text-gray-100 py-6 font-mono">
    <pre class="flex-none w-10 bg-opacity-50">
      {#each rowsIdxNegative as row}
        <span
          class="block h-5 bg-opacity-50 text-xs leading-5 align-middle
          font-mono {row[1] == '+' ? 'bg-green-600' : row[1] == '-' ? 'bg-red-600' : ''}">
          {row[0]}
        </span>
      {/each}
    </pre>
    <pre class="flex-none w-10 bg-opacity-50">
      {#each rowsIdxPositive as row}
        <span
          class="block h-5 bg-opacity-50 text-xs leading-5 align-middle
          font-mono {row[1] == '+' ? 'bg-green-600' : row[1] == '-' ? 'bg-red-600' : ''}">
          {row[0]}
        </span>
      {/each}
    </pre>
  </pre>
  <pre
    class="bg-gray-800 text-gray-100 py-6 overflow-x-scroll w-full font-mono
    text-sm">
    {#each rows as row}
      <span
        class="block h-5 bg-opacity-50 text-xs leading-5 align-middle font-mono {row.charAt(0) == '+' ? 'bg-green-600' : row.charAt(0) == '-' ? 'bg-red-600' : ''}">
        {row}
      </span>
    {/each}
  </pre>
</div>

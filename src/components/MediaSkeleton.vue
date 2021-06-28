<template>
  <div class="flex space-x-2.5 p-2">
    <skeleton :pulse="true" class="flex-shrink-0 w-10 h-10 rounded" />
    <div class="flex flex-col flex-grow space-y-2">
      <skeleton :pulse="true" class="h-3.5" />
      <skeleton :pulse="true" class="h-3.5 w-1/2" />
    </div>
  </div>
</template>

<template>
  <div>
    <skeleton class="w-1/4 h-5" />
    <div class="flex w-full mt-3 -mx-3 overflow-hidden lg:-mx-4">
      <div v-for="i in 6" :key="i" class="w-1/4 px-3 clg:w-1/5 cxl:w-1/6 lg:px-4">
        <skeleton class="pb-[100%]" />
        <skeleton class="h-3.5 mt-2" />
        <skeleton class="h-3.5 mt-2 w-1/2" />
      </div>
    </div>
  </div>
</template>

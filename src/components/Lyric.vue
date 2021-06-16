<template>
  <div class="fixed bg-primary inset-0 z-40">
    <div class="pt-5 pb-24 h-screen flex flex-col justify-between">
      <!-- header -->
      <div class="relative flex items-center">
        <!-- center -->
        <div class="w-1/4 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <div class="flex bg-alpha rounded-full p-1">
            <button class="flex-1 text-base focus:outline-none px-2 py-1 text-secondary">Karaoke</button>
            <button class="flex-1 text-base focus:outline-none px-2 py-1 font-semibold bg-active text-primary rounded-full">Lyric</button>
          </div>
        </div>
        <!-- right -->
        <div class="flex space-x-4 ml-auto">
          <button class="text-xl rounded-full bg-alpha w-12 h-12 flex justify-center items-center">
            <i class="flex ic-settings"></i>
          </button>
          <button class="text-xl rounded-full bg-alpha w-12 h-12 flex justify-center items-center">
            <i class="flex ic-go-down"></i>
          </button>
        </div>
      </div>
      <!-- content -->
      <div class="flex space-x-4 w-4/5 mx-auto">
        <img
          class="rounded-lg"
          style="width: 400px"
          src="https://photo-resize-zmp3.zadn.vn/w512_r1x1_jpeg/cover/2/8/6/f/286f0b4fae2ab3b2a7942968e22bd58f.jpg"
          alt="thumbnail"
        >
        <div class="flex-1">
          <div class="text-xl font-bold text-secondary p-2.5 rounded-lg cursor-pointer">Trăng soi trong đêm mây trôi lặng thầm</div>
          <div class="text-xl font-bold text-progress bg-alpha p-2.5 rounded-lg cursor-pointer">Bên thềm nhà gió nhẹ nhàng</div>
        </div>
      </div>
      <!-- player -->
      <div class="text-center">
        <span class="text-xs font-bold text-primary">Day dut noi dau</span>
        <span class="text-secondary text-xs"> - Mr. Siro</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'LyricModal',
}
</script>

<style>
</style>

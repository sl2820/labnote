<template>
  <div>
    <nav class="navigationbar">
      <div class="flex items-center flex-shrink-0 mr-6 ml-2 mt-1 mb-1">
        <!-- <img
          class="fill-current h-8 w-8 mr-2"
          width="54"
          height="54"
          viewBox="0 0 54 54"
          src="../assets/icon.png"
        /> -->
        <span class="font-semibold tracking-tight">labNote</span>
      </div>
      <div class="font-bold text-xl">Acetaminophen synthesis trial 11</div>
      <div class="block lg:hidden">
        <button
          class="flex items-center px-3 py-2 border rounded text-teal-200 border-teal-400 hover:text-white hover:border-white"
        >
          <svg
            class="fill-current h-3 w-3"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <title>Menu</title>
            <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
          </svg>
        </button>
      </div>
      <div class="w-full block flex-grow lg:flex lg:items-center lg:w-auto">
        <div class="text-sm lg:flex-grow">
          <a
            href="#responsive-header"
            class="block lg:inline-block lg:mt-0 hover:text-white mr-4"
          >
            Save
          </a>
          <a
            href="#responsive-header"
            class="block lg:inline-block lg:mt-0 hover:text-white mr-4"
          >
            Load
          </a>
          <a
            href="#responsive-header"
            class="block lg:inline-block lg:mt-0 hover:text-white"
          >
            Analysis
          </a>
        </div>
        <div class="mr-2">User name</div>
      </div>
    </nav>
  </div>
</template>

<script>
export default {}
</script>

<style lang="css">
.navigationbar {
  @apply flex items-center justify-between flex-wrap mb-3 text-white w-screen shadow bg-gray-500 fixed;
  /* background-color: rgb(119, 182, 109); */
}
</style>

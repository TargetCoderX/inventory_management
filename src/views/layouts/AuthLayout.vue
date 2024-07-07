<script setup>
import Sidebar from "@/components/partials/Sidebar.vue";
import Navbar from "@/components/partials/Navbar.vue";
const props = defineProps({
  title: String,
  description: String,
});
</script>

<template>
  <div class="wrapper">
    <Sidebar />
    <Navbar />
    <div class="content-page">
      <div class="container-fluid">
        <div class="row">
          <div class="col-lg-12">
            <div
              class="d-flex flex-wrap align-items-center justify-content-between mb-4"
            >
              <div>
                <h4 class="mb-3">{{ title || "" }}</h4>
                <p class="mb-0">{{ description || "" }}</p>
              </div>
            </div>
            <slot></slot>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

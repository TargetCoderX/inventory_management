<script setup>
import { onMounted } from "vue";

const props = defineProps(["formTitle", "formDescription"]);
</script>

<template>
  <div class="wrapper">
    <section class="login-content">
      <div class="container">
        <div
          class="row align-items-center justify-content-center height-self-center"
        >
          <div class="col-lg-8">
            <div class="card auth-card">
              <div class="card-body p-0">
                <div class="d-flex align-items-center auth-content">
                  <div class="col-lg-7 align-self-center">
                    <div class="p-3">
                      <h2 class="mb-2">{{ props.formTitle }}</h2>
                      <p>{{ props.formDescription }}</p>
                      <slot></slot>
                    </div>
                  </div>
                  <div class="col-lg-5 content-right">
                    <img
                      src="/assets/images/login/01.png"
                      class="img-fluid image-right"
                      alt=""
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

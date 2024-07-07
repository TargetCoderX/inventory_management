<script setup>
import { ref } from "vue";
import GuestLayout from "../layouts/GuestLayout.vue";
import axios from "axios";
import Cookies from "js-cookie";
import { useRouter } from "vue-router";
const formData = ref({ email: "", password: "" });
const error = ref({ status: false, message: "" });
const router = useRouter();
const doLogin = async () => {
  try {
    let response = await axios.post(
      `${import.meta.env.VITE_API_URL}/login`,
      formData.value,
      {}
    );
    if (response.data.status == 1) {
      error.value = { status: false, message: "" };
      Cookies.set("token", response.data.token, { expires: 1 });
      Cookies.set("user_data", JSON.stringify(response.data.user_data), {
        expires: 1,
      });
      router.push("/dashboard");
    } else {
      error.value = { status: true, message: response.data.message };
    }
  } catch (error) {
    console.log(error);
  }
};
</script>
<template>
  <GuestLayout
    formTitle="Sign In"
    formDescription="Login to Inventory Management System"
  >
    <div v-if="error.status" class="alert alert-danger" role="alert">
      {{ error.message }}
    </div>
    <form @submit.prevent="doLogin()">
      <div class="row">
        <div class="col-lg-12">
          <div class="floating-label form-group">
            <input
              class="floating-input form-control"
              type="email"
              placeholder=" "
              v-model="formData.email"
            />
            <label>Email</label>
          </div>
        </div>
        <div class="col-lg-12">
          <div class="floating-label form-group">
            <input
              class="floating-input form-control"
              type="password"
              placeholder=" "
              v-model="formData.password"
            />
            <label>Password</label>
          </div>
        </div>
        <div class="col-lg-6"></div>
        <div class="col-lg-6">
          <a href="auth-recoverpw.html" class="text-primary float-right"
            >Forgot Password?</a
          >
        </div>
      </div>
      <button type="submit" class="btn btn-primary">Sign In</button>
    </form>
  </GuestLayout>
</template>

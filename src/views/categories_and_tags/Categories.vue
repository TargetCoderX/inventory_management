<script setup>
import { onMounted, ref } from "vue";
import AuthLayout from "../layouts/AuthLayout.vue";
import axios from "axios";
import Cookies from "js-cookie";
import { useToast } from "vue-toast-notification";
import "vue-toast-notification/dist/theme-sugar.css";

let categoryForm = ref({
  category_name: "",
  category_description: "",
  status: true,
});
const allCategories = ref([]);

const toast = useToast();
const submitCategoryForm = async () => {
  try {
    const response = await axios.post(
      `${import.meta.env.VITE_API_URL}/save-category`,
      categoryForm.value,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: Cookies.get("token"),
        },
      }
    );

    if (response.data.status == 1) {
      toast.success(response.data.message);
      categoryForm.value = {
        category_name: "",
        category_description: "",
        status: true,
      };
      getAllCategories();
    } else {
      toast.error(response.data.messsage);
    }
  } catch (error) {
    toast.error(error);
  }
};

const getAllCategories = async () => {
  const response = await axios.get(
    `${import.meta.env.VITE_API_URL}/get-category`,
    {
      headers: {
        Authorization: Cookies.get("token"),
      },
    }
  );
  if (response.data.status == 1) {
    allCategories.value = response.data.data;
  } else {
    toast.error(response.data.message);
  }
};

onMounted(() => {
  getAllCategories();
});

const activeDeactive = async (category_id, updated_status) => {
  try {
    const response = await axios.post(
      `${import.meta.env.VITE_API_URL}/update-category-status`,
      { category_id, updated_status },
      {
        headers: {
          Authorization: Cookies.get("token"),
        },
      }
    );
    if (response.data.status == 1) {
      toast.success(response.data.message);
    } else {
      toast.error(response.data.message);
    }

    getAllCategories();
  } catch (error) {}
};

const deleteCategory = async (category_id) => {
  const response = await axios.delete(
    `${import.meta.env.VITE_API_URL}/delete-category`,
    {
      headers: {
        Authorization: Cookies.get("token"),
      },
      data: { category_id },
    }
  );

  if (response.data.status == 1) toast.success(response.data.message);
  else toast.error(response.data.message);
  getAllCategories();
};
</script>
<template>
  <AuthLayout
    title="Categories"
    description="Manage, Add, and Organize Categories Effortlessly for Seamless Control and Accessibility"
  >
    <div class="row">
      <div class="col-md-3">
        <div class="card">
          <div class="card-body">
            <h6 class="card-title">Add Categories</h6>
            <p>Add category from this form</p>
            <form
              data-toggle="validator"
              novalidate="true"
              @submit.prevent="submitCategoryForm"
            >
              <div class="row">
                <div class="col-md-12">
                  <div class="form-group">
                    <label>Category Name *</label>
                    <input
                      type="text"
                      class="form-control"
                      placeholder="Category Name"
                      required=""
                      v-model="categoryForm.category_name"
                    />
                    <div class="help-block with-errors"></div>
                  </div>
                </div>
                <div class="col-md-12">
                  <div class="form-group">
                    <label>description *</label>
                    <input
                      type="text"
                      class="form-control"
                      placeholder="Category Description"
                      required=""
                      v-model="categoryForm.category_description"
                    />
                    <div class="help-block with-errors"></div>
                  </div>
                </div>
                <div class="col-md-12">
                  <div class="form-group">
                    <label for="">Status</label>
                    <div class="custom-control custom-switch">
                      <input
                        type="checkbox"
                        class="custom-control-input"
                        id="customSwitch1"
                        v-model="categoryForm.status"
                      />
                      <label class="custom-control-label" for="customSwitch1"
                        >Toggle this switch element</label
                      >
                    </div>
                  </div>
                </div>
              </div>
              <div class="text-center">
                <button type="submit" class="btn btn-primary mr-2">
                  Save Category
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <div class="col-md-9">
        <div class="card">
          <div class="card-body">
            <h6 class="card-title">Category List</h6>
            <p>
              Use category list as to describe your overall core business from
              the provided list
            </p>
            <div class="table-responsive rounded mb-3">
              <table class="data-table table mb-0 tbl-server-info">
                <thead class="bg-white text-uppercase">
                  <tr class="ligth ligth-data">
                    <th>#</th>
                    <th>Catgory Name</th>
                    <th>Category Description</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody class="ligth-body">
                  <tr
                    v-for="(categories, index) in allCategories"
                    :key="categories._id"
                  >
                    <td>{{ index + 1 }}</td>
                    <td>
                      {{
                        categories.category_name
                          .split(" ")
                          .map(
                            (element) =>
                              element.charAt(0).toUpperCase() +
                              element.slice(1).toLowerCase()
                          )
                          .join(" ")
                      }}
                    </td>
                    <td>
                      <span class="ellipsis">{{
                        categories.category_description
                      }}</span>
                    </td>
                    <td class="justify-content-between">
                      <button
                        class="btn btn-sm mr-1"
                        style="width: 100px"
                        :class="[
                          categories.status ? 'btn-success' : 'btn-warning',
                        ]"
                        @click="
                          activeDeactive(
                            categories._id,
                            categories.status ? false : true
                          )
                        "
                      >
                        {{ categories.status ? "Active" : "De-Activated" }}
                      </button>
                      <button
                        class="btn btn-danger btn-sm"
                        style="width: 100px"
                        @click.prevent="deleteCategory(categories._id)"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  </AuthLayout>
</template>

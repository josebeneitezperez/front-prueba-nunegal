import { describe, it, expect, beforeAll } from "vitest";
import { mount } from "@vue/test-utils";
import AppHeader from "@/components/AppHeader.vue";
import { createTestingPinia } from "@pinia/testing";
import { createRouter, createMemoryHistory } from "vue-router";

let router;

/**
 * Preparación previa a los tests
 */
beforeAll(async () => {
  router = createRouter({
    history: createMemoryHistory(),
    routes: [],
  });
  router.push("/");
  await router.isReady();
});

function mountAppHeader() {
  return mount(AppHeader, {
    global: {
      plugins: [createTestingPinia(), router],
    },
  });
}

/**
 * Tests
 */
describe("AppHeader.vue", () => {
  it("se debe mostrar el logo", async () => {
    const wrapper = mountAppHeader();
    const logo = wrapper.find("img.logo-image");
    expect(logo.exists()).toBe(true);
  });
});

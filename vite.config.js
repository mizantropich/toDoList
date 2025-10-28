import { defineConfig } from 'vite'

export default defineConfig({
  base: '/toDoList/',
  test: {
    globals: true,
    environment: 'jsdom',
    css: true,
    coverage: {
      provider: 'v8',
      reporter: ['text', 'html']
    }
  }
})

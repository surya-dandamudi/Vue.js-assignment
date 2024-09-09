<template>
  <div class="app-container">
    <header>
      <div class="nav-container">
       
        <nav>
          <RouterLink to="/">Home</RouterLink>
          <RouterLink to="/add-car">Add Car</RouterLink>
        </nav>
      </div>
    </header>
    <main>
      <RouterView />
    </main>
  </div>
</template>


<style scoped>
html, body {
  height: 100%;
  margin: 0;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

.app-container {
  display: flex;
  flex-direction: column;
  height: 100vh; 
  width: 100vw; 
  opacity: 0.9;
}

header {
  background-color: #343a40;
  padding: 1rem 1rem;
  width: 100%;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.nav-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.logo {
  font-size: 1.5rem;
  font-weight: bold;
}

.logo a {
  color: #fff;
  text-decoration: none;
  transition: color 0.3s ease;
}

.logo a:hover {
  color: #adb5bd;
}

nav {
  display: flex;
  gap: 1.5rem;
}

nav a {
  padding: 0.5rem 1.5rem;
  text-decoration: none;
  color: #fff;
  font-size: 1rem;
  font-weight: 500;
  border-radius: 5px;
  transition: background-color 0.3s ease, color 0.3s ease;
}

nav a:hover {
  background-color: #495057;
  color: #fff;
}

main {
  flex: 1;
  padding: 2rem;
  overflow: auto;
  width: 100%;
}

</style>


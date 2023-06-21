<template>
    <nav class="navbar navbar-expand-lg navbar-light bg-light vorder-bottom">
        <div class="container py-2">
            <a href="#" class="navbar-brand">
                <span>ToDo</span>
                <strong>App</strong>
            </a>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse"
            data-bs-target="#navbaeNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarNav">
                <ul class="navbar-nav">
                    <li class="nav-item">
                       <router-link :to="{name: 'tasks'}" class="nav-link">Tasks</router-link>
                    </li>
                    <li class="nav-item">
                        <router-link :to="{name: 'summary'}" class="nav-link">Summary</router-link>
                    </li> 
                </ul>
                <ul class="navbar-nav ms-auto">
                    <li class="nav-item">
                          <router-link :to="{name: 'login'}" class="btn btn-outline-secondary ms-2">Login</router-link>
                    </li>
                    <li class="nav-item">
                        <router-link :to="{name: 'register'}" class="btn btn-primary ms-2">Register</router-link>
                  </li>
                  <li class="nav-item">
                    <a href="#" class="btn btn-danger ms-2">Logout</a>
               </li>
                </ul>
            </div>
        </div>
    </nav>
   
</template>


<style scoped>
.nav-link.router-link-active {
    color: rgba(127, 26, 235, 0.9);
}
</style>
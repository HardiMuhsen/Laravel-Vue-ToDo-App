<template>
     <main style="min-height:50vh; margin-top:2rem; ">
        <div class="container">
            <div class="row">
                <div class="col-md-8 offset-md-2">
                    <!-- Add New Task -->
                    <NewTask @added="handleAddedTask" />

                    <!-- List of uncompleted Tasks -->
                    <Tasks :tasks="uncompletedTasks"
                     @updated="handleUpdatedTask"
                     @completed="handleCompletedTask"
                     @removed="handleRemovedTask"
                      /> 

                    <!-- show toggle button -->
                    <div class="text-center my-3" v-show="showToggleCompletedBtn">
                        <button class="btn btn-sm btn-secondary" 
                        @click="$event => showCompletedTasks = !showCompletedTasks">
                            <span v-if="!showCompletedTasks">Show Completed</span>
                            <span v-else>Hide Completed</span>
                         </button>
                    </div>

                    <!-- List of completed Task -->
                    <Tasks :tasks="completedTasks"
                    :show="completedTasksIsVisible && showCompletedTasks"
                    @updated="handleUpdatedTask"
                    @completed="handleCompletedTask"
                    @removed="handleRemovedTask"
                    /> 

                </div>
            </div>
        </div>
    </main>
</template>

<script setup>
    import { computed, onMounted, ref } from "vue";
    import { storeToRefs } from "pinia";
    import { useTaskStore } from "../stores/Task"
    import { allTasks, createTask, updateTask, completeTask, removeTask } from "../http/Task-api.js"
    import Tasks from "../component/tasks/Tasks.vue"
    import NewTask from "../component/tasks/NewTask.vue"

    const store = useTaskStore()
    const { completedTasks, uncompletedTasks } = storeToRefs(store)
    //     store.$patch({
    //     task: {
    //         name: "first task updated by $patch",
    //         is_completed: true
    //     }
    // })

    const tasks = ref([])

    onMounted(async () => {
       const {data} = await allTasks()
       tasks.value = data.data
    
       
    }) 
    
    const showToggleCompletedBtn = computed(() => uncompletedTasks.value.length > 0 && completedTasks.value.length > 0)
    const completedTasksIsVisible = computed(() => uncompletedTasks.value.length === 0 || completedTasks.value.length > 0) 
    const showCompletedTasks = ref(false)

    const handleAddedTask = async(newTask) => {
        const {data: createdTask } = await createTask(newTask)
        tasks.value.unshift(createdTask.data)
    }

    const handleUpdatedTask = async (task) => {
        const { data: updatedTask } = await updateTask(task.id, {
        name: task.name
    })

    const currentTask = tasks.value.find(item => item.id === task.id)
    currentTask.name = updatedTask.data.name

}

const handleCompletedTask = async (task) => {
        const { data: updatedTask } = await completeTask(task.id, {
        is_completed: task.is_completed
    })

    const currentTask = tasks.value.find(item => item.id === task.id)
    currentTask.is_completed = updatedTask.data.is_completed
}

const handleRemovedTask = async (task) => {
    await removeTask(task.id)
    const index = tasks.value.findIndex(item => item.id === task.id)
    tasks.value.splice(index, 1)
}

</script>
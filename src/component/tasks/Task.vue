<template>
    <li class="list-group-item py-3">
        <div class="d-flex justify-content-start align-items-center">
            <input type="checkbox" class="form-check-input mt-0" 
            :class="completedClass" 
            :checked="task.is_completed"
            @change="markTaskAsCompleted"
            />
            <div class="ms-2 flex-grow-1" 
            :class="completedClass" 
            title="Double click the text to edit or remove"
            @dblclick="$event => isEdit = true"
            >
                <div class="relative" v-if="isEdit">
                    <input class="editale-task" 
                    type="text"
                    v-focus
                    @keyup.esc="undo" 
                    @keyup.enter="updateTask"
                    v-model="editingTask"
                    />
                </div>
                <span v-else>{{ task.name }}</span>
            </div>
           <!-- <div class="task-date">20 Jun 12:00</div>-->
        </div>
        <TaskActions 
        @edit="$event => isEdit = true" 
        v-show="!isEdit"
        @remove="removeTasks"
         />
    </li>
</template>

<script setup>
import { computed, ref } from "vue"
import TaskActions from "./TaskActions.vue";
import { removeTask } from "../../http/Task-api";

const props = defineProps({
    task: Object
})

const emit = defineEmits(['updated' , 'completed', 'removed'])

const isEdit = ref(false)
const editingTask = ref(props.task.name)
const completedClass = computed(() => props.task.is_completed ? "completed" : "" )

const vFocus = {
    mounted: (el) => el.focus()
}

const updateTask = event => {
    const updatedTask = { ...props.task, name: event.target.value }
    isEdit.value = false
    emit('updated', updatedTask)
}

const undo = () => {
    isEdit.value = false
    editingTask.value = props.task.name
}

const markTaskAsCompleted = event => {
    const updatedTask = { ...props.task, is_completed: !props.task.is_completed }
    emit('completed', updatedTask)
}

const removeTasks = () => {
    if(confirm("Are you sure?")) {
    emit('removed', props.task)
}
}


</script>
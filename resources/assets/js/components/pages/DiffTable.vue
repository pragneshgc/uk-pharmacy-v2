<template>
    <table class="table table-hover mt-20">
        <thead>
            <tr>
                <th>
                    Field
                </th>
                <th>
                    Old Value
                </th>
                <th>
                    New Value
                </th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="(change, key) in newObject" :key="key">
                <td>
                    {{ key }}
                </td>
                <td>
                    {{ oldObject[key] }}
                </td>
                <td>
                    {{ newObject[key] }}
                </td>
            </tr>
        </tbody>
    </table>        
</template>

<script>
    export default {
        props: ['oldObject', 'newObject'],
    }
</script>
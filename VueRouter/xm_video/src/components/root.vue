<template>
    <div>
        <router-link to="/A">A</router-link>
        <router-link style="margin-left: 30px;" to="/BC">BC</router-link>
        <hr>
        <router-view></router-view>
        <router-view name="B"></router-view>
        <router-view name="C"></router-view>
    </div>
</template>
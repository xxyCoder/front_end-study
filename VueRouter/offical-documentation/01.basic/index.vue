<script setup>
import { useRouter } from 'vue-router';
const router = useRouter();
// 字符串路径
router.push('/users/xxyCoder');
// 带路径的对象
router.push({ path: 'users/xxyCoder' });
// 命名路由
router.push({ name: 'users', params: { userrname: 'xxyCoder' } })
// 带查询参数   /register?username=xxyCoder
router.push({ path: '/register', query: { username: 'xxyCoder' } })
// 带hash   /about#team
router.push({ path: '/about', hash: '#team' })
// 检测导航错误
const navigationResult = await router.push('/my-profile')
if(navigationResult) {
    // 导航被阻止
} else {
    // 导航成功
}
</script>

<template>
    <div>
        <div>
            <router-view class="view left-sidebar" name="LeftSidebar"></router-view>
            <router-view class="view main-content"></router-view>
            <router-view class="view right-sidebar" name="RightSidebar"></router-view>
        </div>
        <div>
            <router-view name="helper"></router-view>
        </div>
    </div>
</template>
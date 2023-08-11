<script lang="ts">
	import MenuButton from '@components/elements/menu/menu-button.svelte';
	import MenuItem from '@components/elements/menu/menu-item.svelte';
	import MenuContainer from '@components/elements/menu/menu-container.svelte';
	import Menu from '@components/elements/menu/menu.svelte';
	import Logout from './logout.svelte';
	import { useAuth } from '$lib/supabase/auth';
	import UserCircle from '@components/elements/icons/user-circle.svelte';

	const auth = useAuth();

	const menuItemClasses /*tw*/ = 'px-4 py-2 text-sm text-neutral-700 hover:bg-neutral-200';
	const menuClasses /*tw*/ = 'right-0 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none';
</script>

<!--TODO - add real photo url -->
<MenuContainer class="relative ml-3">
	<MenuButton class="flex rounded-full bg-gray-800 text-sm">
		{#if $auth.data?.avatar_url}
			<img class="h-8 w-8 rounded-full" src={$auth.data?.avatar_url} alt={$auth.data?.full_name} />
		{:else}
			<UserCircle class="w-8 h-8 text-gray-200 bg-red-800 dark:bg-black" />
		{/if}
	</MenuButton>
	<Menu class={menuClasses}>
		<MenuItem class={menuItemClasses}>Your Profile</MenuItem>
		<MenuItem class={menuItemClasses} href="/settings">Settings</MenuItem>
		<MenuItem class={menuItemClasses} href="/dashboard">Dashboard</MenuItem>
		<MenuItem class={menuItemClasses} href="/course/new">New Course</MenuItem>
		<hr class="h-px bg-neutral-200 border-0 dark:bg-neutral-400" />
		<Logout />
	</Menu>
</MenuContainer>

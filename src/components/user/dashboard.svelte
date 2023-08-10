<script lang="ts">
	import Tabs from '@components/elements/tabs/tabs.svelte';
	import Tab from '@components/elements/tabs/tab.svelte';
	import Card from '@components/elements/card.svelte';
	import { page } from '$app/stores';
	import Loader from '@components/elements/loader.svelte';

	export let user: UserType;
</script>

<Card class="mb-5 p-10 text-center">
	<h1 class="text-5xl font-semibold">Welcome {user.user_metadata.full_name || 'New User'}!</h1>
</Card>
<Tabs class="mb-5" active="Drafts" panels={['Bookmarks', 'My Posts', 'Drafts', 'Scheduled']}>
	<Tab>
		<div>Bookmarks will be here...</div>
	</Tab>
	<Tab>My Posts</Tab>
	<Tab>

	</Tab>
	<Tab>Unpublished</Tab>
</Tabs>

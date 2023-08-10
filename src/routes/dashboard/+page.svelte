<script lang="ts">
	import Dashboard from '@components/user/dashboard.svelte';
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<Dashboard user={data.user} />

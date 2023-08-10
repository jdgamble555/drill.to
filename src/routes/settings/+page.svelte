<script lang="ts">
	import Settings from '@components/user/settings.svelte';
	import type { PageData } from './$types';

	export let data: PageData;

</script>

<Settings user={data.user} profile={data.profile} />

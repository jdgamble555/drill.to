<script lang="ts">
	import '../app.css';
	import Leftbar from '@components/layout/leftbar.svelte';
	import Rightbar from '@components/layout/rightbar.svelte';
	import Topbar from '@components/layout/topbar/topbar.svelte';
	import Container from '@components/layout/container.svelte';
	import Columns from '@components/layout/columns.svelte';
	import Header from '@components/layout/header.svelte';
	import Footer from '@components/layout/footer.svelte';
	import Content from '@components/layout/content.svelte';
	import { useAuth } from '$lib/supabase/auth';
	import Dark from '@components/layout/dark.svelte';
	import Toast from '@components/elements/toast/toast.svelte';
	import { useToast } from '@components/elements/toast/use-toast';
	import type { LayoutData } from './$types';

	export let data: LayoutData;

	const auth = useAuth();
	const { message } = useToast();

	auth.setSession(data.session);
</script>

<Dark>
	{#if $message}
		<Toast />
	{/if}
	<Topbar />
	<Container>
		<Header />
		<Columns>
			<Leftbar>left bar 21</Leftbar>
			<Content><slot /></Content>
			<Rightbar>right bar xxx</Rightbar>
		</Columns>
		<Footer />
	</Container>
</Dark>

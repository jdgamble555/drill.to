<script lang="ts">
	import Course from '@components/course/course.svelte';
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<Course course={data.course} />

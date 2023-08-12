<script lang="ts">

	import CourseList from '@components/course/course-list.svelte';
import type { PageData } from './$types';

	export let data: PageData;
</script>

<CourseList courses={data.courses.data} />
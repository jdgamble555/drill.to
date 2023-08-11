<script lang="ts">
	import type { PageData } from './$types';

	export let data: PageData;
</script>

{#if data.courses.data}
	<ul>
		{#each data.courses.data as course}
			<li><a href={`course/${course.short_id}/${course.slug}`}>{course.name}</a></li>
		{/each}
	</ul>
{:else}
	<p>No Courses Yet!</p>
{/if}

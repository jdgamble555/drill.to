<script lang="ts">
	import { useMenu } from './use-menu';

	// declare menu contexts at top level
	useMenu();
</script>

<div class="flex items-end">
	<div class={$$restProps?.class + ' relative'}>
		<slot />
	</div>
</div>

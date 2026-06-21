<script lang="ts">
	import { fly } from 'svelte/transition';
	import { cubicOut } from 'svelte/easing';
	import { onMount } from 'svelte';
	import * as m from '$lib/paraglide/messages';

	const roles = [m.hero_role1(), m.hero_role2(), m.hero_role3(), m.hero_role4()];
	const greetingWords = [m.hero_greeting1(), m.hero_greeting2(), m.hero_greeting3()];

	let wordVisible = $state(greetingWords.map(() => false));
	let nameVisible = $state(false);
	let subtitleVisible = $state(false);
	let ctaVisible = $state(false);

	onMount(() => {
		const wordTimers = greetingWords.map((_, i) =>
			setTimeout(() => {
				wordVisible[i] = true;
			}, i * 120)
		);

		const nameTimer = setTimeout(
			() => {
				nameVisible = true;
			},
			greetingWords.length * 120 + 100
		);

		const subtitleTimer = setTimeout(() => (subtitleVisible = true), 1000);
		const ctaTimer = setTimeout(() => (ctaVisible = true), 1600);

		return () => {
			wordTimers.forEach(clearTimeout);
			clearTimeout(nameTimer);
			clearTimeout(subtitleTimer);
			clearTimeout(ctaTimer);
		};
	});
</script>

<section
	id="hero"
	aria-label="Hero"
	class="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-4 py-10"
>
	<div class="relative z-10 flex flex-col items-center gap-4 text-center">
		<!-- Animated title -->
		<h1 class="text-5xl leading-tight font-black sm:text-7xl" aria-label="Greeting">
			<span class="flex flex-wrap justify-center gap-x-4" aria-hidden="true">
				{#each greetingWords as word, i}
					{#if wordVisible[i]}
						<span in:fly={{ y: 20, duration: 600 }}>{word}</span>
					{:else}
						<span class="opacity-0">{word}</span>
					{/if}
				{/each}
			</span>

			<span aria-hidden="true">
				{#if nameVisible}
					<span in:fly={{ y: 20, duration: 600 }} class="text-primary"> Victor :) </span>
				{:else}
					<span class="opacity-0">Victor.</span>
				{/if}
			</span>
		</h1>

		{#if subtitleVisible}
			<div
				in:fly={{ y: 16, duration: 900, easing: cubicOut }}
				class="flex w-full flex-col items-center justify-center"
			>
				<span class="text-2xl">{m.hero_help()}</span>
				<span
					class="text-rotate text-2xl font-bold text-primary duration-[9000ms]"
					aria-label={roles.join(', ')}
				>
					<span aria-hidden="true">
						{#each roles as role (role)}
							<span>{role}</span>
						{/each}
					</span>
				</span>
			</div>
		{/if}

		{#if ctaVisible}
			<div
				in:fly={{ y: 16, duration: 900, easing: cubicOut }}
				class="mt-4 flex flex-wrap justify-center gap-4"
			>
				<a href="#about" class="btn rounded-full px-8 font-bold shadow-lg btn-primary">
					{m.nav_about()} ↓
				</a>
				<a href="/hello.txt" download class="btn rounded-full px-8 font-bold btn-outline">
					Download CV
				</a>
			</div>
		{/if}
	</div>
</section>

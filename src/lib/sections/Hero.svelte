<script lang="ts">
	import { fly, fade } from 'svelte/transition';
	import { onMount } from 'svelte';
	import { ChevronDown } from '@lucide/svelte';
	import * as m from '$lib/paraglide/messages';

	const roles = [m.hero_role1(), m.hero_role2(), m.hero_role3()];
	const greetingWords = [m.hero_greeting1(), m.hero_greeting2(), m.hero_greeting3()];

	let wordVisible = $state(greetingWords.map(() => false));
	let nameVisible = $state(false);
	let subtitleVisible = $state(false);
	let ctaVisible = $state(false);

	let roleIndex = $state(0);
	let roleVisible = $state(true);

	onMount(() => {
		const wordTimers = greetingWords.map((_, i) =>
			setTimeout(() => {
				wordVisible[i] = true;
			}, i * 120)
		);

		const nameTimer = setTimeout(() => {
			nameVisible = true;
		}, greetingWords.length * 120 + 100);

		const subtitleTimer = setTimeout(() => (subtitleVisible = true), 900);
		const ctaTimer = setTimeout(() => (ctaVisible = true), 1300);

		const roleInterval = setInterval(() => {
			roleVisible = false;
			setTimeout(() => {
				roleIndex = (roleIndex + 1) % roles.length;
				roleVisible = true;
			}, 350);
		}, 2800);

		return () => {
			wordTimers.forEach(clearTimeout);
			clearTimeout(nameTimer);
			clearTimeout(subtitleTimer);
			clearTimeout(ctaTimer);
			clearInterval(roleInterval);
		};
	});
</script>

<section
	id="hero"
	aria-label="Hero"
	class="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-4 py-20"
>


	<!-- Main content -->
	<div class="relative z-10 flex flex-col items-center gap-4 text-center">

		<!-- Animated title -->
		<h1
			class="text-5xl font-black leading-tight sm:text-7xl"
			aria-label="Greeting"
		>
			<!-- Greeting words — staggered -->
			<span class="flex flex-wrap justify-center gap-x-4" aria-hidden="true">
				{#each greetingWords as word, i}
					{#if wordVisible[i]}
						<span in:fly={{ y: 20, duration: 600 }}>{word}</span>
					{:else}
						<span class="opacity-0">{word}</span>
					{/if}
				{/each}
			</span>

			<!-- Name — lands last, primary color -->
			<span aria-hidden="true">
				{#if nameVisible}
					<span
						in:fly={{ y: 20, duration: 600 }}
						class="text-primary"
					>
						Victor.
					</span>
				{:else}
					<span class="opacity-0">Victor.</span>
				{/if}
			</span>
		</h1>

		<!-- Role slider -->
		{#if subtitleVisible}
			<div
				in:fade={{ duration: 500 }}
				class="h-9 overflow-hidden relative flex items-center justify-center w-full"
				aria-live="polite"
				aria-label={roles[roleIndex]}
			>
				{#if roleVisible}
					<span
						in:fly={{ y: 12, duration: 350 }}
						out:fly={{ y: -12, duration: 350 }}
						class="absolute text-xl font-bold text-primary"
					>
						{roles[roleIndex]}
					</span>
				{/if}
			</div>
		{/if}

		<!-- CTA buttons -->
		{#if ctaVisible}
			<div
				in:fly={{ y: 12, duration: 500 }}
				class="mt-4 flex flex-wrap justify-center gap-4"
			>
				<a
					href="#about"
					class="btn btn-primary rounded-full px-8 font-bold shadow-lg"
				>
					{m.nav_about()} ↓
				</a>
				<a
					href="/hello.txt"
					download
					class="btn btn-outline rounded-full px-8 font-bold"
				>
					Download CV
				</a>
			</div>
		{/if}

	</div>

	<!-- Scroll indicator -->
	{#if ctaVisible}
		<div
			in:fade={{ duration: 800 }}
			class="absolute bottom-8 flex flex-col items-center gap-1 opacity-40"
			aria-hidden="true"
		>
			<span class="text-xs tracking-widest uppercase">Scroll</span>
			<ChevronDown size={18} class="animate-bounce" />
		</div>
	{/if}
</section>
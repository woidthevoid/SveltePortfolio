<script lang="ts">
	import './layout.css';
	import favicon from '$lib/assets/favicon.svg';
	import ThemeSwap from '$lib/ThemeSwap.svelte';
	import { Menu, X } from '@lucide/svelte';
	import { onMount } from 'svelte';

	let { children } = $props();
	let menuOpen = $state(false);
	let visible = $state(true);
	let lastScrollY = $state(0);
	const links = [
		{ href: '#about', label: 'Om Mig' },
		{ href: '#experience', label: 'Erfaring' },
		{ href: '#projects', label: 'Projekter' },
		{ href: '#contacts', label: 'Kontakt' }
	];

	onMount(() => {
		const handleScroll = () => {
			const currentScrollY = window.scrollY;
			visible = currentScrollY < lastScrollY || currentScrollY < 50;
			lastScrollY = currentScrollY;
		};

		window.addEventListener('scroll', handleScroll, { passive: true });

		return () => {
			window.removeEventListener('scroll', handleScroll);
		};
	});

</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<header class="fixed top-0 w-full z.50 transition-transform duration-300" id="header">

	<div id="navbar" class="navbar bg-base-200/60 backdrop-blur-md border-b border-base-content/10">

		<div class="navbar-start gap-2">
			<span class="font-extrabold text-2xl">Victor Woydowski Dralle</span>
		</div>

		<div class="navbar-center hidden sm:flex gap-2">
			{#each links as link(link.href)}
				<a href={link.href} class="btn btn-ghost btn-small rounded-full font-bold text-lg">{link.label}</a>
			{/each}
		</div>

		<div class="navbar-end gap-2">
			<button
				class="btn btn-ghost bg-transparent sm:hidden"
				onclick={() => menuOpen = !menuOpen}
				aria-label="Toggle menu"
			>
				{#if menuOpen}
					<X size={24} />
				{:else}
					<Menu size={24} />
				{/if}
			</button>

			<div id="theme-switch" class="btn btn-ghost btn-small rounded-full">
				<ThemeSwap />
			</div>
			
		</div>
	</div>

	{#if menuOpen}
		<nav
			class="sm:hidden bg-base-200/80 backdrop-blur-md border-b border-base-content/10 flex flex-col px-4 pb-4 gap-2">
			{#each links as link (link.href)}
				<a
					class="btn btn-ghost rounded-full"
					href={link.href}
					onclick={() => menuOpen = false}
				>{link.label}</a>
			{/each}
		</nav>
	{/if}

</header>

<main class="pt-16">
	{@render children()}
</main>

<footer id="footer" class="footer footer-horizontal footer-center bg-primary text-primary-content">
	<p class="font-bold">Victor Woydowski Dralle</p>
	<p>Copyright © {new Date().getFullYear()} - All right reserved</p>
</footer>
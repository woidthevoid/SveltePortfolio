<script lang="ts">
	import './layout.css';
	import favicon from '$lib/assets/favicon.svg';
	import {fade} from 'svelte/transition';
	import ThemeSwap from '$lib/components/ThemeSwap.svelte';
	import LanguageSwap from '$lib/components/LanguageSwap.svelte';
	import { Menu, ArrowUp } from '@lucide/svelte';
	import { onMount } from 'svelte';
	import * as m from '$lib/paraglide/messages';
	import '@fontsource/jetbrains-mono/400.css';
	import '@fontsource/jetbrains-mono/600.css';
	import '@fontsource/jetbrains-mono/700.css';
	import '@fontsource/jetbrains-mono/800.css';

	let { children } = $props();
	let visible = $state(true);
	let lastScrollY = $state(0);
	let showScrollTop = $state(false);
	let currentSection = $state(m.nav_about());

	// TODO: navbar isnt full width on desktop
	const links = [
		{ href: '#about', label: m.nav_about() },
		{ href: '#experience', label: m.nav_experience() },
		{ href: '#projects', label: m.nav_projects() },
		{ href: '#contacts', label: m.nav_contact() }
	];

	onMount(() => {
		const handleScroll = () => {
			const currentScrollY = window.scrollY;
			visible = currentScrollY < lastScrollY || currentScrollY < 50;
			lastScrollY = currentScrollY;
			showScrollTop = currentScrollY > 10;
		};

		window.addEventListener('scroll', handleScroll, { passive: true });

		return () => {
			window.removeEventListener('scroll', handleScroll);
		};
	});
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
	<title>Victor Woydowski Dralle | {currentSection}</title>
</svelte:head>

<header
	class="fixed top-0 z-50 w-full transition-transform duration-300 {visible
		? 'translate-y-0'
		: '-translate-y-full'}"
	id="header"
>

	<div id="navbar" class="navbar glass">

		<div class="navbar-start gap-2">
			<a href="#hero" class="font-extrabold lg:text-2xl md:text-xl sm:text-xl">Victor Woydowski Dralle</a>
		</div>

		<div class="navbar-center hidden sm:flex gap-2">
			{#each links as link (link.href)}
				<a href={link.href} onclick={() => currentSection = link.label} class="btn btn-ghost btn-small rounded-full font-bold text-lg">{link.label}</a>
			{/each}
		</div>

		<div class="navbar-end gap-2">

			<button
				class="btn btn-ghost sm:hidden"
				popovertarget="nav-mobile-menu"
				style="anchor-name:--nav-mobile-anchor; position-area: bottom center"
				aria-label="Åbn navigation menu"
				aria-haspopup="true"
			>
				<Menu size={24} />
			</button>

			<ul
				class="dropdown menu w-52 rounded-box bg-base-200 shadow-lg border border-base-content/10 sm:hidden"
				popover
				id="nav-mobile-menu"
				style="position-anchor:--nav-mobile-anchor"
				aria-label="Navigation menu"
			>
				{#each links as link (link.href)}
					<li>
						<a href={link.href} class="font-bold" onclick={() => {currentSection = link.label; document.getElementById('nav-mobile-menu')?.hidePopover();}}>
							{link.label}
						</a>
					</li>
				{/each}
			</ul>

			<div id="theme-switch" class="btn btn-ghost btn-sm sm:btn-md">
				<ThemeSwap />
			</div>

			<div id="language-switch">
				<LanguageSwap />
			</div>

		</div>
	</div>

</header>

<main class="pt-16">
	{@render children()}
</main>

<!--Button to scroll to top, showing when screen has been scrolled down-->
{#if showScrollTop}
	<button
		transition:fade={{duration: 300}}
		class="btn btn-neutral btn-circle fixed bottom-6 right-6 z-50 shadow-lg transition-all duration-500"
		onclick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
		aria-label="Scroll til toppen"
	>
		<ArrowUp size={24} />
	</button>
{/if}

<footer id="footer" class="footer footer-horizontal footer-center bg-primary text-primary-content">
	<p class="font-bold">Victor Woydowski Dralle</p>
	<p>Copyright © {new Date().getFullYear()} - All right reserved</p>
</footer>
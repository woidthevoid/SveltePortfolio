<script>
	// @ts-ignore
	import profile from '$lib/assets/me.JPG';
	import { GraduationCap, User, MapPin, Briefcase } from '@lucide/svelte';
	import * as m from "$lib/paraglide/messages";

	/* listContent represents data used for the about me section with titles, icons and content */
	const listContent = [
		{ icon: User, title: m.hero_name(), content: 'Victor Woydowski Dralle' },
		{
			icon: GraduationCap,
			title: m.hero_education(),
			content: m.hero_eduname()
		},
		{ icon: Briefcase, title: m.hero_experience(), content: m.hero_experience_content() },
		{ icon: MapPin, title: m.hero_location(), content: m.hero_location_name() }
	];
</script>

<!--About section-->
<section id="about" aria-labelledby="about-heading" class="px-4 py-16 sm:px-8">
	<h2 id="about-heading" class="mb-8 flex items-center gap-4 text-3xl font-extrabold">
		Om mig
		<span class="h-px flex-1 bg-base-content/20" role="none"></span>
	</h2>

	<div class="mx-auto max-w-7xl">
		<div class="rounded-3xl bg-base-200 px-6 py-8 shadow-md sm:px-10 sm:py-10">
			<div class="w-full flex flex-col items-start gap-8 sm:flex-row">
				<div class="flex shrink-0 flex-col items-center gap-6 sm:items-start">
					<!--Picture with tilting effect when hovered over, divs enable interactivity-->
					<div class="hover-3d shrink-0" role="img" aria-label="Portræt af Victor Woydowski Dralle">
						<figure class="w-56 rounded-2xl">
							<img src={profile} alt="" class="h-full w-full rounded-full object-cover" />
						</figure>
						<div></div>
						<div></div>
						<div></div>
						<div></div>
						<div></div>
						<div></div>
						<div></div>
						<div></div>
					</div>

					<ul class="w-52 space-y-3 text-sm" aria-label="Fakta om Victor">
						{#each listContent as { icon: Icon, content, title }(title)}
							<li>
								<div class="flex flex-col gap-2">
									<Icon size={16} aria-hidden="true" class="shrink-0 text-primary"></Icon>
									<span class="font-semibold">{title}</span>
								</div>
								<p>{content}</p>
							</li>
						{/each}
					</ul>
				</div>

				<div class="flex flex-1 flex-col gap-4 text-base leading-relaxed">
					<p>{@html m.about_intro()}</p>
					<p>{m.about_passion()}</p>
					<p>{m.about_hobbies()}</p>

					<div>
						<div aria-label="download resume" class="btn btn-primary rounded-3xl text-bold ">
							<a href="/hello.txt" download>
								{m.resume_button()}
							</a>
					</div>
					</div>

				</div>
			</div>
		</div>
	</div>
</section>

<section id="experience" aria-labelledby="experience-heading" class="px-4 py-16 sm:px-8"></section>
<h2 id="experience-heading" class="mb-8 flex items-center gap-4 text-3xl font-extrabold">
	Erfaring
	<span class="h-px flex-1 bg-base-content/20" role="none"></span>
</h2>

<section id="projects"></section>

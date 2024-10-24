import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { SignInClient } from '../components/app/SocialLogin'
import { InstagramLogoIcon, StarFilledIcon } from '@radix-ui/react-icons'
import { ArrowUpRight, Facebook, Gamepad2, Languages, Menu, MessageCircleMore, Pencil, Rocket, Users, Users2, X } from 'lucide-react'

export default function Page(req) {
  const cookieStore = cookies()
  const jwt = cookieStore.get('jwt')
  if (jwt) {
    return redirect('/app')
  }

  return (
    <>
      <script></script>
      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-6">
        <a className="block" href="/">
          <img className="dont-replace hidden w-32 lg:w-auto" src="" alt="logo" />
          <div id="nav-name-text" className="primary-color-text text-3xl font-bold text-indigo-500">
            Vocal
          </div>
        </a>
        <div id="nav-links" className="hidden items-center gap-4 text-gray-500 md:flex lg:gap-14">
          <a
            id="nav-link-one"
            href="/#section-one"
            className="transition ease-linear lg:hover:text-black"
          >
            Explore
          </a>
          <a
            id="nav-link-two"
            href="/#section-two"
            className="transition ease-linear lg:hover:text-black"
          >
            Learn
          </a>
          <a
            id="nav-link-contact"
            href="/#contact"
            className="transition ease-linear lg:hover:text-black"
          >
            Contact
          </a>
        </div>
        <SignInClient />
        {/* <button className="toggleMenu md:hidden">
          <Menu className="text-2xl" aria-hidden="true"></Menu>
        </button> */}
      </div>
      <section className="code-section relative overflow-hidden bg-[#faf8f4]" id="sho3jg">
        <div className="mx-auto grid max-w-7xl gap-20 px-5 py-10 lg:grid-cols-2 lg:gap-5 lg:py-20 hovered-element">
          <div>
            <div className="relative text-3xl font-bold leading-tight md:text-5xl xl:text-7xl">
              <h1 className="min-h-[6rem] pr-24">
                <span id="hero-text-beginning" className="relative z-20">
                  Discover
                </span>
                <span> </span>
                <span id="hero-text-emphasis" className="relative whitespace-nowrap">
                  Language Skills
                </span>
                <span> </span>
                <span id="hero-text-end" className="relative z-20">
                  Effortlessly
                </span>
              </h1>
              <div className="absolute right-0 top-0">
                <img
                  className="testimonial-image dont-replace relative z-20 h-24 w-24 rounded-2xl bg-gray-200 object-cover md:h-24 md:w-24 xl:rounded-[30px]"
                  src="https://images.unsplash.com/photo-1525569624703-0f3c10276414?crop=entropy&amp;cs=tinysrgb&amp;fit=max&amp;fm=jpg&amp;ixid=M3w0MzEzMzd8MHwxfHNlYXJjaHwxfHxWb2NhYnVsYXJ5fGVufDB8MHx8fDE3Mjk2Nzc3NDl8MA&amp;ixlib=rb-4.0.3&amp;q=80&amp;w=1920"
                  alt="girl"
                  data-media='{"id":"z9m8DM2Mk88","src":"unsplash","type":"image"}'
                />
                <div className="primary-color-bg absolute inset-0 z-0 h-24 w-24 -translate-y-1 translate-x-1 rounded-2xl md:h-24 md:w-24 xl:rounded-[30px] bg-indigo-500"></div>
              </div>
            </div>
            <p id="hero-subtext" className="pb-9 pt-4 text-lg font-light text-gray-500">
              Vocal is your ultimate English learning companion, enabling you to personalize your
              learning journey by creating and exploring vocabulary sets tailored to your needs.
            </p>
            <div className="relative flex items-start gap-4 pb-24 md:items-center md:gap-10">
              <SignInClient />
              <a
                className="primary-color-border group flex items-center gap-2 border-b p-2 transition ease-linear md:p-4 lg:hover:border-transparent border-indigo-500"
                href="/#section-one"
              >
                <span className="primary-color-text text-lg font-thin text-indigo-500">
                  Learn More
                </span>
                <ArrowUpRight
                  className="primary-color-text text-lg text-indigo-500"
                  aria-hidden="true"
                />
              
              </a>
              <img
                className="dont-replace absolute right-0 top-10 z-10 w-20 md:w-auto xl:top-0"
                src="https://landingsite-static-web-images.s3.us-east-2.amazonaws.com/template10/green-curve-shape.svg"
                alt="curve shape"
              />
            </div>
            <div className="grid gap-11 sm:grid-cols-2">
              <div className="relative">
                <div className="flex items-center gap-2.5 pb-3">
                  <img
                    className="testimonial-image dont-replace h-10 w-10 overflow-hidden rounded-full object-cover"
                    src="https://images.unsplash.com/photo-1477865300989-86ba6d4adcab?crop=entropy&amp;cs=tinysrgb&amp;fit=max&amp;fm=jpg&amp;ixid=M3w0MzEzMzd8MHwxfHNlYXJjaHwyfHxWb2NhYnVsYXJ5fGVufDB8MHx8fDE3Mjk2Nzc3NDl8MA&amp;ixlib=rb-4.0.3&amp;q=80&amp;w=1920"
                    alt="avatar"
                    data-media='{"id":"k-P2ow0S6o4","src":"unsplash","type":"image"}'
                  />
                  <p className="text-lg font-semibold opacity-80">Jane Doe</p>
                </div>
                <div className="flex items-center gap-3 pb-3 md:pb-6">
                  <div className="flex items-center gap-0.5">
                    <StarFilledIcon width={24} height={24} className="text-yellow-400" />
                    <StarFilledIcon width={24} height={24} className="text-yellow-400" />
                    <StarFilledIcon width={24} height={24} className="text-yellow-400" />
                    <StarFilledIcon width={24} height={24} className="text-yellow-400" />
                    <StarFilledIcon width={24} height={24} className="text-yellow-400" />
                  </div>
                </div>
                <p id="testimonial-quote1" className="text-sm font-thin text-gray-500">
                  Vocal has transformed the way I learn English, making vocabulary building engaging
                  and incredibly effective.
                </p>
                <img
                  className="dont-replace absolute -top-5 right-20 z-10"
                  src="https://landingsite-static-web-images.s3.us-east-2.amazonaws.com/template10/four-angle-star.svg"
                  alt=""
                />
              </div>
              <div className="relative">
                <div className="flex items-center gap-2.5 pb-3">
                  <img
                    className="testimonial-image dont-replace h-10 w-10 overflow-hidden rounded-full object-cover"
                    src="https://images.unsplash.com/photo-1633412240680-162744752997?crop=entropy&amp;cs=tinysrgb&amp;fit=max&amp;fm=jpg&amp;ixid=M3w0MzEzMzd8MHwxfHNlYXJjaHwzfHxWb2NhYnVsYXJ5fGVufDB8MHx8fDE3Mjk2Nzc3NDl8MA&amp;ixlib=rb-4.0.3&amp;q=80&amp;w=1920"
                    alt="avatar"
                    data-media='{"id":"yLrNnFnjyJ0","src":"unsplash","type":"image"}'
                  />
                  <p className="text-lg font-semibold opacity-80">Andy</p>
                </div>
                <div className="flex items-center gap-3 pb-3 md:pb-6">
                  <div className="flex items-center gap-0.5">
                    <StarFilledIcon width={24} height={24} className="text-yellow-400" />
                    <StarFilledIcon width={24} height={24} className="text-yellow-400" />
                    <StarFilledIcon width={24} height={24} className="text-yellow-400" />
                    <StarFilledIcon width={24} height={24} className="text-yellow-400" />
                    <StarFilledIcon width={24} height={24} className="text-yellow-400" />
                  </div>
                </div>
                <p id="testimonial-quote2" className="text-sm font-thin text-gray-500">
                  With the community-created vocabulary sets, I feel more connected and motivated to
                  achieve my language goals.
                </p>
                <img
                  className="dont-replace absolute -top-5 right-20 z-10"
                  src="https://landingsite-static-web-images.s3.us-east-2.amazonaws.com/template10/four-angle-star.svg"
                  alt=""
                />
              </div>
            </div>
          </div>
          <div className="relative grid grid-cols-5 gap-x-8 gap-y-4 lg:pl-20">
            <div className="relative col-span-2">
              <div>
                <img
                  className="dont-replace absolute -right-8 bottom-4 z-10 w-24 sm:right-0 sm:w-auto"
                  src="https://landingsite-static-web-images.s3.us-east-2.amazonaws.com/template10/orange-bubble.svg"
                  alt=""
                />
                <p
                  id="emphasized-word-one"
                  className="absolute -right-1 bottom-14 z-10 -rotate-[25deg] text-xl font-semibold text-white/80 sm:bottom-20 sm:right-10 sm:text-4xl lg:text-3xl xl:text-4xl"
                >
                  word
                </p>
              </div>
              <img
                className="dont-replace absolute left-2 top-6"
                src="https://landingsite-static-web-images.s3.us-east-2.amazonaws.com/template10/four-angle-star.svg"
                alt=""
              />
            </div>
            <div className="relative col-span-3">
              <img
                className="relative z-20 h-40 w-full rounded-[30px] object-cover shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)] sm:h-48"
                src="https://media.gettyimages.com/id/1491060008/photo/english-dictionary-open-with-the-background-of-a-living-room.jpg?b=1&amp;s=612x612&amp;w=0&amp;k=20&amp;c=YI0VbkMor1YKhtwHShGGefWLXlxNaw2ODRJa2suVpww="
                alt="girl"
                data-media='{"id":"1491060008","src":"iStock","type":"image"}'
              />
              <div className="primary-color-bg absolute inset-0 z-[1] h-40 w-full -translate-y-2 translate-x-2 rounded-[30px] sm:h-48 bg-indigo-500"></div>
            </div>
            <div className="relative col-span-5">
              <img
                className="seo-image high-res-image relative z-20 h-64 w-full rounded-[30px] object-cover shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)] sm:h-[340px]"
                src="https://imagedelivery.net/xaKlCos5cTg_1RWzIu_h-A/af0592ba-e9bb-4453-bc06-141bea1ee100/public"
                alt="girl"
                data-media='{"id":"1961969776","src":"iStock","type":"image"}'
              />
              <div className="primary-color-bg absolute inset-0 z-0 h-64 w-full translate-x-2 translate-y-2 rounded-[30px] sm:h-[340px] bg-indigo-500"></div>
              <img
                className="dont-replace absolute -left-6 -top-6 z-30 w-16 sm:w-auto"
                src="https://landingsite-static-web-images.s3.us-east-2.amazonaws.com/template10/orange-dots.svg"
                alt=""
              />
              <img
                className="dont-replace absolute -bottom-10 -right-10 z-30 w-16 sm:w-auto"
                src="https://landingsite-static-web-images.s3.us-east-2.amazonaws.com/template10/orange-dots.svg"
                alt=""
              />
            </div>
            <div className="relative col-span-3 sm:col-span-2">
              <img
                className="relative z-20 h-32 w-full rounded-[30px] object-cover shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)] xl:h-40"
                src="https://media.gettyimages.com/id/1488315525/photo/businessmanman-search-website-for-content-keywords-on-laptop-browse-in-office-optimize-seo.jpg?b=1&amp;s=612x612&amp;w=0&amp;k=20&amp;c=0iQGo7SaUEYMoNxXtZsTO4BSJqr_83Lem6t-EqaOdGU="
                alt="girl"
                data-media='{"id":"1488315525","src":"iStock","type":"image"}'
              />
              <div className="primary-color-bg absolute inset-0 z-[1] h-32 w-full -translate-y-1 translate-x-1 rounded-[30px] xl:h-40 bg-indigo-500"></div>
            </div>
            <div className="relative col-span-2 sm:col-span-3">
              <img
                className="dont-replace absolute -left-8 top-4 z-10 w-28 sm:left-0 sm:w-auto"
                src="https://landingsite-static-web-images.s3.us-east-2.amazonaws.com/template10/yellow-bubble.svg"
                alt=""
              />
              <p
                id="emphasized-word-two"
                className="absolute left-0 top-12 z-10 rotate-[28deg] text-xl sm:left-8 sm:text-2xl"
              >
                learn
              </p>
              <img
                className="dont-replace absolute right-0 top-4 z-10 sm:left-32"
                src="https://landingsite-static-web-images.s3.us-east-2.amazonaws.com/template10/four-angle-star.svg"
                alt=""
              />
              <img
                className="dont-replace absolute -bottom-10 right-0 z-10 hidden sm:block xl:bottom-0"
                src="https://landingsite-static-web-images.s3.us-east-2.amazonaws.com/template10/orange-curve-shape.svg"
                alt=""
              />
            </div>
            <div className="primary-color-bg primary-opacity-[10] absolute -right-20 left-0 top-1/2 h-[590px] -translate-y-1/2 rounded-3xl bg-indigo-500/10"></div>
          </div>
        </div>
      </section>

      <section id="section-one" className="code-section bg-[#faf8f4] ">
        <div className="mx-auto max-w-7xl px-5 py-10 lg:py-20">
          <div className="relative grid items-center gap-y-5 lg:grid-cols-2 xl:gap-10">
            <div className="relative">
              <h1
                id="about-header"
                className="text-4xl/normal font-bold lg:text-5xl/normal xl:text-6xl/normal"
              >
                Why You Need Vocal?
              </h1>
              <img
                className="dont-replace absolute left-12 top-12 z-10 w-40 lg:top-16 lg:w-64 xl:top-20"
                src="https://landingsite-static-web-images.s3.us-east-2.amazonaws.com/template10/double-line.svg"
                alt=""
              />
            </div>
            <p id="about-subtext" className="font-thin text-gray-500 lg:pl-20 lg:text-lg">
              Vocal is more than just another English learning app. Built using Next.js and styled
              with TailwindCSS, it offers a vibrant and engaging platform where you can learn and
              expand your vocabulary. Whether you create your own word sets or learn from those
              shared by others, Vocal was designed to be inclusive and easy to use, making language
              acquisition enjoyable and efficient.
            </p>
            <img
              className="dont-replace absolute left-1/2 top-32 z-10 hidden -translate-x-1/2 lg:block xl:top-40"
              src="https://landingsite-static-web-images.s3.us-east-2.amazonaws.com/template10/green-curve-shape-easy.svg"
              alt=""
            />
          </div>
          <div className="grid gap-9 pt-10 lg:grid-cols-3 lg:pt-28 hovered-element">
            <div className="relative rounded-3xl bg-gray-200 px-6 pb-40 pt-8 xl:px-9 xl:pt-12">
              <h3 className="text-2xl md:text-3xl xl:text-4xl">
                <span id="about-1-text-beginning">Boost</span>
                <span> </span>
                <span id="about-1-text-emphasis" className="primary-color-text text-indigo-500">
                  Vocabulary
                </span>
                <span> </span>
                <span id="about-1-text-end">Easily</span>
              </h3>
              <p id="about-1-subtext" className="pt-4 text-lg font-thin text-gray-500">
                Customize your learning with personal or community vocabulary sets.
              </p>
              <img
                className="dont-replace absolute bottom-4 left-4 h-[100px] w-[105px]"
                src="https://landingsite-static-web-images.s3.us-east-2.amazonaws.com/template10/swirl.svg"
                alt=""
              />
              <div className="absolute bottom-0 right-0 flex h-24 w-24 items-end justify-end rounded-tl-3xl bg-[#faf8f4] md:h-32 md:w-32">
                <div className="group relative flex h-20 w-20 items-center justify-center rounded-full bg-gray-200 md:h-28 md:w-28">
                  <div id="about-1-icon" className="primary-color-text text-3xl text-indigo-500">
                    <Languages className="fa-solid fa-language" size={32} aria-hidden="true"></Languages>
                  </div>
                  <div className="absolute -left-10 bottom-0 z-10 h-12 w-6 rounded-br-3xl bg-gray-200 shadow-[0_15px_0_0_#faf8f4] lg:shadow-[0_25px_0_0_#faf8f4]"></div>
                  <div className="absolute -top-16 right-0 z-10 h-12 w-6 rounded-br-3xl bg-gray-200 shadow-[0_15px_0_0_#faf8f4] lg:shadow-[0_25px_0_0_#faf8f4]"></div>
                </div>
              </div>
            </div>
            <div className="relative rounded-3xl bg-gray-200 px-6 pb-40 pt-8 lg:pb-12 lg:pt-40 xl:px-9">
              <h3 className="text-2xl md:text-3xl xl:text-4xl">
                <span id="about-2-text-beginning">Engage</span>
                <span> </span>
                <span id="about-2-text-emphasis" className="primary-color-text text-indigo-500">
                  Community
                </span>
                <span> </span>
                <span id="about-2-text-end">Learning</span>
              </h3>
              <p id="about-2-subtext" className="pt-4 text-lg font-thin text-gray-500">
                Join a vibrant community and share resources seamlessly.
              </p>
              <img
                className="dont-replace absolute bottom-10 left-10 h-[76px] w-[82px] lg:top-10"
                src="https://landingsite-static-web-images.s3.us-east-2.amazonaws.com/template10/globe.svg"
                alt=""
              />
              <div className="absolute bottom-0 right-0 flex h-24 w-24 items-end justify-end rounded-tl-3xl bg-[#faf8f4] md:h-32 md:w-32 lg:top-0 lg:items-start lg:rounded-bl-3xl lg:rounded-tl-none">
                <div className="group relative flex h-20 w-20 items-center justify-center rounded-full bg-gray-200 md:h-28 md:w-28">
                  <div id="about-2-icon" className="primary-color-text text-3xl text-indigo-500">
                    <Users size={32} className="fa-solid fa-users" aria-hidden="true"></Users>
                  </div>
                  <div className="absolute -bottom-16 right-0 z-10 hidden h-12 w-6 rounded-tr-3xl bg-gray-200 shadow-[0_-25px_0_0_#faf8f4] lg:block"></div>
                  <div className="absolute -left-10 top-0 z-10 hidden h-12 w-6 rounded-tr-3xl bg-gray-200 shadow-[0_-25px_0_0_#faf8f4] lg:block"></div>
                  <div className="absolute -left-10 bottom-0 z-10 h-12 w-6 rounded-br-3xl bg-gray-200 shadow-[0_15px_0_0_#faf8f4] lg:hidden"></div>
                  <div className="absolute -top-16 right-0 z-10 h-12 w-6 rounded-br-3xl bg-gray-200 shadow-[0_15px_0_0_#faf8f4] lg:hidden"></div>
                </div>
              </div>
            </div>
            <div className="relative rounded-3xl bg-gray-200 px-6 pb-40 pt-8 xl:px-9 xl:pt-12">
              <h3 className="text-2xl md:text-3xl xl:text-4xl">
                <span id="about-3-text-beginning">Achieve</span>
                <span> </span>
                <span id="about-3-text-emphasis" className="primary-color-text text-indigo-500">
                  Fluency
                </span>
                <span> </span>
                <span id="about-3-text-end">Faster</span>
              </h3>
              <p id="about-3-subtext" className="pt-4 text-lg font-thin text-gray-500">
                Innovative methods to accelerate your language skills.
              </p>
              <img
                className="dont-replace absolute bottom-6 left-6 h-[85px] w-[83px]"
                src="https://landingsite-static-web-images.s3.us-east-2.amazonaws.com/template10/arrow.svg"
                alt=""
              />
              <div className="absolute bottom-0 right-0 flex h-24 w-24 items-end justify-end rounded-tl-3xl bg-[#faf8f4] md:h-32 md:w-32">
                <div className="group relative flex h-20 w-20 items-center justify-center rounded-full bg-gray-200 md:h-28 md:w-28">
                  <div id="about-3-icon" className="primary-color-text text-3xl text-indigo-500">
                    <Rocket size={32} className="fa-solid fa-rocket" aria-hidden="true"></Rocket>
                  </div>
                  <div className="absolute -left-10 bottom-0 z-10 h-12 w-6 rounded-br-3xl bg-gray-200 shadow-[0_15px_0_0_#faf8f4] lg:shadow-[0_25px_0_0_#faf8f4]"></div>
                  <div className="absolute -top-16 right-0 z-10 h-12 w-6 rounded-br-3xl bg-gray-200 shadow-[0_15px_0_0_#faf8f4] lg:shadow-[0_25px_0_0_#faf8f4]"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="section-two" className="code-section bg-[#faf8f4] ">
        <div className="mx-auto max-w-7xl px-5 py-10 lg:py-20">
          <div className="relative grid items-center gap-y-5 lg:grid-cols-2 xl:gap-10">
            <div className="relative">
              <h1
                id="why-choose-us-header"
                className="pr-12 text-4xl/normal font-bold lg:text-5xl/normal xl:text-6xl/normal"
              >
                Why Choose Vocal?
              </h1>
              <img
                className="dont-replace absolute left-12 top-12 z-10 w-40 lg:top-16 lg:w-64 xl:top-20"
                src="https://landingsite-static-web-images.s3.us-east-2.amazonaws.com/template10/double-line.svg"
                alt=""
              />
              <img
                className="dont-replace absolute right-0 top-0 z-10 block md:top-4 lg:block xl:w-16"
                src="https://landingsite-static-web-images.s3.us-east-2.amazonaws.com/template10/four-angle-star.svg"
                alt=""
              />
            </div>
            <p id="why-choose-us-subtext" className="font-thin text-gray-500 lg:pl-20 lg:text-lg">
              Because learning a new language should be as dynamic and personalized as you are. With
              Vocal, take advantage of cutting-edge technology to elevate your English vocabulary
              skills and connect with a community of learners.
            </p>
            <img
              className="dont-replace absolute right-0 top-40 z-10 hidden lg:block hovered-element"
              src="https://landingsite-static-web-images.s3.us-east-2.amazonaws.com/template10/green-curve-shape-choose.svg"
              alt=""
            />
          </div>
          <div className="relative mt-10 grid grid-cols-8 gap-2 lg:mt-28">
            <div
              className="same-image high-res-image absolute z-10 h-full w-full bg-cover bg-center sm:hidden"
              style={{
                backgroundImage: `url("https://images.unsplash.com/photo-1477865300989-86ba6d4adcab?crop=entropy&amp;cs=tinysrgb&amp;fit=max&amp;fm=jpg&amp;ixid=M3w0MzEzMzd8MHwxfHNlYXJjaHwyfHxWb2NhYnVsYXJ5fGVufDB8MHx8fDE3Mjk2Nzk0MjN8MA&amp;ixlib=rb-4.0.3&amp;q=80&amp;w=1920")`,
              }}
              data-media='{"id":"k-P2ow0S6o4","src":"unsplash","type":"image"}'
            ></div>
            <div
              className="same-image high-res-image col-span-3 hidden h-28 overflow-hidden rounded-[30px] bg-contain bg-fixed bg-center bg-no-repeat md:block md:h-40 lg:h-52"
              style={{
                backgroundImage: `url("https://images.unsplash.com/photo-1477865300989-86ba6d4adcab?crop=entropy&amp;cs=tinysrgb&amp;fit=max&amp;fm=jpg&amp;ixid=M3w0MzEzMzd8MHwxfHNlYXJjaHwyfHxWb2NhYnVsYXJ5fGVufDB8MHx8fDE3Mjk2Nzk0MjN8MA&amp;ixlib=rb-4.0.3&amp;q=80&amp;w=1920")`,
              }}
              data-media='{"id":"k-P2ow0S6o4","src":"unsplash","type":"image"}'
            ></div>
            <div className="primary-color-bg relative z-10 col-span-4 flex h-28 flex-col items-center justify-center rounded-2xl p-6 text-white/80 md:col-span-2 md:h-40 md:gap-3 md:rounded-[30px] lg:h-52 lg:p-10 bg-indigo-500">
              <h1 id="stats-1-number" className="text-3xl font-bold md:text-5xl lg:text-6xl">
                50K
              </h1>
              <p
                id="stats-1-text"
                className="text-center text-sm font-thin md:text-base lg:text-lg"
              >
                Active Learners
              </p>
            </div>
            <div
              className="same-image high-res-image col-span-4 h-28 overflow-hidden rounded-2xl bg-contain bg-fixed bg-center bg-no-repeat md:col-span-3 md:h-40 md:bg-transparent md:opacity-0 lg:h-52"
              style={{
                backgroundImage: `url("https://images.unsplash.com/photo-1477865300989-86ba6d4adcab?crop=entropy&amp;cs=tinysrgb&amp;fit=max&amp;fm=jpg&amp;ixid=M3w0MzEzMzd8MHwxfHNlYXJjaHwyfHxWb2NhYnVsYXJ5fGVufDB8MHx8fDE3Mjk2Nzk0MjN8MA&amp;ixlib=rb-4.0.3&amp;q=80&amp;w=1920")`,
              }}
              data-media='{"id":"k-P2ow0S6o4","src":"unsplash","type":"image"}'
            ></div>
            <div
              className="same-image high-res-image relative col-span-2 hidden h-28 overflow-hidden rounded-2xl bg-contain bg-fixed bg-center bg-no-repeat md:block md:h-40 md:rounded-[30px] lg:h-52"
              style={{
                backgroundImage: `url("https://images.unsplash.com/photo-1477865300989-86ba6d4adcab?crop=entropy&amp;cs=tinysrgb&amp;fit=max&amp;fm=jpg&amp;ixid=M3w0MzEzMzd8MHwxfHNlYXJjaHwyfHxWb2NhYnVsYXJ5fGVufDB8MHx8fDE3Mjk2Nzk0MjN8MA&amp;ixlib=rb-4.0.3&amp;q=80&amp;w=1920")`,
              }}
              data-media='{"id":"k-P2ow0S6o4","src":"unsplash","type":"image"}'
            ></div>
            <div
              className="same-image high-res-image col-span-2 h-28 overflow-hidden rounded-2xl bg-contain bg-fixed bg-center bg-no-repeat md:h-40 md:rounded-[30px] lg:h-52"
              style={{
                backgroundImage: `url("https://images.unsplash.com/photo-1477865300989-86ba6d4adcab?crop=entropy&amp;cs=tinysrgb&amp;fit=max&amp;fm=jpg&amp;ixid=M3w0MzEzMzd8MHwxfHNlYXJjaHwyfHxWb2NhYnVsYXJ5fGVufDB8MHx8fDE3Mjk2Nzk0MjN8MA&amp;ixlib=rb-4.0.3&amp;q=80&amp;w=1920")`,
              }}
              data-media='{"id":"k-P2ow0S6o4","src":"unsplash","type":"image"}'
            ></div>
            <div className="primary-color-bg relative z-10 col-span-4 flex h-28 flex-col items-center justify-center rounded-2xl p-6 text-white/80 md:col-span-2 md:h-40 md:gap-3 md:rounded-[30px] lg:h-52 lg:p-10 bg-indigo-500">
              <h1 id="stats-2-number" className="text-3xl font-bold md:text-5xl lg:text-6xl">
                1M
              </h1>
              <p
                id="stats-2-text"
                className="text-center text-sm font-thin md:text-base lg:text-lg"
              >
                Words Mastered
              </p>
            </div>
            <div
              className="same-image high-res-image col-span-2 mt-auto h-20 overflow-hidden rounded-2xl bg-contain bg-fixed bg-center bg-no-repeat md:rounded-[30px] lg:h-40"
              style={{
                backgroundImage: `url("https://images.unsplash.com/photo-1477865300989-86ba6d4adcab?crop=entropy&amp;cs=tinysrgb&amp;fit=max&amp;fm=jpg&amp;ixid=M3w0MzEzMzd8MHwxfHNlYXJjaHwyfHxWb2NhYnVsYXJ5fGVufDB8MHx8fDE3Mjk2Nzk0MjN8MA&amp;ixlib=rb-4.0.3&amp;q=80&amp;w=1920")`,
              }}
              data-media='{"id":"k-P2ow0S6o4","src":"unsplash","type":"image"}'
            ></div>
            <div
              className="same-image high-res-image col-span-2 h-28 overflow-hidden rounded-2xl bg-contain bg-fixed bg-center bg-no-repeat md:h-40 md:rounded-[30px] lg:h-52"
              style={{
                backgroundImage: `url("https://images.unsplash.com/photo-1477865300989-86ba6d4adcab?crop=entropy&amp;cs=tinysrgb&amp;fit=max&amp;fm=jpg&amp;ixid=M3w0MzEzMzd8MHwxfHNlYXJjaHwyfHxWb2NhYnVsYXJ5fGVufDB8MHx8fDE3Mjk2Nzk0MjN8MA&amp;ixlib=rb-4.0.3&amp;q=80&amp;w=1920")`,
              }}
              data-media='{"id":"k-P2ow0S6o4","src":"unsplash","type":"image"}'
            ></div>
            <div
              className="same-image high-res-image col-span-2 h-28 overflow-hidden rounded-2xl bg-contain bg-fixed bg-center bg-no-repeat md:col-span-3 md:h-40 md:rounded-[30px] lg:h-52"
              style={{
                backgroundImage: `url("https://images.unsplash.com/photo-1477865300989-86ba6d4adcab?crop=entropy&amp;cs=tinysrgb&amp;fit=max&amp;fm=jpg&amp;ixid=M3w0MzEzMzd8MHwxfHNlYXJjaHwyfHxWb2NhYnVsYXJ5fGVufDB8MHx8fDE3Mjk2Nzk0MjN8MA&amp;ixlib=rb-4.0.3&amp;q=80&amp;w=1920")`,
              }}
              data-media='{"id":"k-P2ow0S6o4","src":"unsplash","type":"image"}'
            ></div>
            <div className="primary-color-bg relative z-10 col-span-4 flex h-28 flex-col items-center justify-center rounded-2xl p-6 text-white/80 md:col-span-2 md:h-40 md:gap-3 md:rounded-[30px] lg:h-52 lg:p-10 bg-indigo-500">
              <h1 id="stats-3-number" className="text-3xl font-bold md:text-5xl lg:text-6xl">
                10K+
              </h1>
              <p
                id="stats-3-text"
                className="text-center text-sm font-thin md:text-base lg:text-lg"
              >
                Community Sets
              </p>
            </div>
            <div
              className="same-image high-res-image col-span-1 hidden h-28 overflow-hidden rounded-2xl bg-contain bg-fixed bg-center bg-no-repeat md:block md:h-40 md:rounded-[30px] lg:h-52"
              style={{
                backgroundImage: `url(https://images.unsplash.com/photo-1477865300989-86ba6d4adcab?crop=entropy&amp;cs=tinysrgb&amp;fit=max&amp;fm=jpg&amp;ixid=M3w0MzEzMzd8MHwxfHNlYXJjaHwyfHxWb2NhYnVsYXJ5fGVufDB8MHx8fDE3Mjk2Nzk0MjN8MA&amp;ixlib=rb-4.0.3&amp;q=80&amp;w=1920);"`,
              }}
              data-media='{"id":"k-P2ow0S6o4","src":"unsplash","type":"image"}'
            ></div>
            <img
              className="dont-replace absolute right-20 top-0 hidden w-40 md:block lg:w-auto"
              src="https://landingsite-static-web-images.s3.us-east-2.amazonaws.com/template10/choose-orange-shape.svg"
              alt=""
            />
          </div>
        </div>
      </section>

      <section className="code-section bg-[#faf8f4] " id="s6kj2k3">
        <div className="mx-auto max-w-7xl px-5 py-10 lg:py-20">
          <div className="relative grid items-center gap-y-5 lg:grid-cols-2 xl:gap-10">
            <div className="relative">
              <h1
                id="information-header"
                className="text-4xl/normal font-bold lg:text-5xl/normal xl:text-6xl/normal"
              >
                Engage with Your Learning
              </h1>
              <img
                className="dont-replace absolute left-32 top-12 z-10 w-40 lg:top-16 lg:w-64 xl:left-52 xl:top-20"
                src="https://landingsite-static-web-images.s3.us-east-2.amazonaws.com/template10/double-line.svg"
                alt=""
              />
            </div>
            <p id="information-subtext" className="font-thin text-gray-500 lg:pl-20 lg:text-lg">
              Explore these features and more through beautifully crafted and interactive design.
            </p>
            <img
              className="dont-replace absolute left-1/2 top-0 z-10 hidden h-[76px] w-[72px] -translate-x-1/2 lg:block"
              src="https://landingsite-static-web-images.s3.us-east-2.amazonaws.com/template10/star.svg"
              alt=""
            />
          </div>
          <div className="grid gap-5 pt-10 lg:grid-cols-3 lg:gap-9 lg:pt-28">
            <div className="relative rounded-3xl bg-gray-200 p-4 md:pb-20 lg:pb-8">
              <img
                className="relative z-40 h-60 w-full rounded-xl object-cover md:h-72 lg:h-56 xl:h-72"
                src="https://images.unsplash.com/photo-1633412240680-162744752997?crop=entropy&amp;cs=tinysrgb&amp;fit=max&amp;fm=jpg&amp;ixid=M3w0MzEzMzd8MHwxfHNlYXJjaHwzfHxWb2NhYnVsYXJ5fGVufDB8MHx8fDE3Mjk2Nzk0MjN8MA&amp;ixlib=rb-4.0.3&amp;q=80&amp;w=1920"
                alt=""
                data-media='{"id":"yLrNnFnjyJ0","src":"unsplash","type":"image"}'
              />
              <h3 id="information-1-header" className="pt-8 text-xl font-bold text-black/80">
                Personalized Learning
              </h3>
              <p
                id="information-1-text"
                className="pr-24 pt-4 text-lg text-gray-800 sm:pt-12 md:pr-32 md:pt-8"
              >
                Tailor your vocabulary sets to fit needs.
              </p>
              <div className="absolute bottom-0 right-0 flex h-20 w-20 items-end justify-end rounded-tl-3xl bg-[#faf8f4] md:h-28 md:w-28">
                <div className="group relative flex h-16 w-16 items-center justify-center rounded-2xl bg-gray-200 md:h-24 md:w-24 md:rounded-3xl">
                  <div
                    id="information-1-icon"
                    className="primary-color-text text-3xl text-indigo-500"
                  >
                    <Pencil size={32} className="fa-solid fa-pencil-alt" aria-hidden="true"></Pencil>
                  </div>
                  <div className="absolute -left-10 bottom-0 z-10 h-12 w-6 rounded-br-3xl bg-gray-200 shadow-[0_15px_0_0_#faf8f4]"></div>
                  <div className="absolute -top-16 right-0 z-10 h-12 w-6 rounded-br-3xl bg-gray-200 shadow-[0_15px_0_0_#faf8f4]"></div>
                </div>
              </div>
            </div>
            <div className="relative rounded-3xl bg-gray-200 p-4 md:pb-20 lg:pb-8">
              <img
                className="relative z-40 h-60 w-full rounded-xl object-cover md:h-72 lg:h-56 xl:h-72"
                src="https://media.gettyimages.com/id/1491060008/photo/english-dictionary-open-with-the-background-of-a-living-room.jpg?b=1&amp;s=612x612&amp;w=0&amp;k=20&amp;c=YI0VbkMor1YKhtwHShGGefWLXlxNaw2ODRJa2suVpww="
                alt=""
                data-media='{"id":"1491060008","src":"iStock","type":"image"}'
              />
              <h3 id="information-2-header" className="pt-8 text-xl font-bold text-black/80">
                Community Driven
              </h3>
              <p
                id="information-2-text"
                className="pr-24 pt-4 text-lg text-gray-800 sm:pt-12 md:pr-32 md:pt-8"
              >
                Collaborate and learn with others' vocab sets.
              </p>
              <div className="absolute bottom-0 right-0 flex h-20 w-20 items-end justify-end rounded-tl-3xl bg-[#faf8f4] md:h-28 md:w-28">
                <div className="group relative flex h-16 w-16 items-center justify-center rounded-2xl bg-gray-200 md:h-24 md:w-24 md:rounded-3xl">
                  <div
                    id="information-2-icon"
                    className="primary-color-text text-3xl text-indigo-500"
                  >
                    <Users2 size={32} className="fa-solid fa-users-cog" aria-hidden="true"></Users2>
                  </div>
                  <div className="absolute -left-10 bottom-0 z-10 h-12 w-6 rounded-br-3xl bg-gray-200 shadow-[0_15px_0_0_#faf8f4]"></div>
                  <div className="absolute -top-16 right-0 z-10 h-12 w-6 rounded-br-3xl bg-gray-200 shadow-[0_15px_0_0_#faf8f4]"></div>
                </div>
              </div>
            </div>
            <div className="relative rounded-3xl bg-gray-200 p-4 md:pb-20 lg:pb-8">
              <img
                className="relative z-40 h-60 w-full rounded-xl object-cover md:h-72 lg:h-56 xl:h-72"
                src="https://media.gettyimages.com/id/1961969776/photo/girl-listening-young-highschool-boy-talking-about-book-at-library-edification.jpg?b=1&amp;s=612x612&amp;w=0&amp;k=20&amp;c=oiN_FSkHBd_nxcmefk6Gsn1kahCgZPg77laP5bPoHgU="
                alt=""
                data-media='{"id":"1961969776","src":"iStock","type":"image"}'
              />
              <h3 id="information-3-header" className="pt-8 text-xl font-bold text-black/80">
                Interactive Activities
              </h3>
              <p
                id="information-3-text"
                className="pr-24 pt-4 text-lg text-gray-800 sm:pt-12 md:pr-32 md:pt-8"
              >
                Engage with fun and effective learning tasks.
              </p>
              <div className="absolute bottom-0 right-0 flex h-20 w-20 items-end justify-end rounded-tl-3xl bg-[#faf8f4] md:h-28 md:w-28">
                <div className="group relative flex h-16 w-16 items-center justify-center rounded-2xl bg-gray-200 md:h-24 md:w-24 md:rounded-3xl">
                  <div
                    id="information-3-icon"
                    className="primary-color-text text-3xl text-indigo-500"
                  >
                    <Gamepad2 size={32} className="fa-solid fa-gamepad" aria-hidden="true"></Gamepad2>
                  </div>
                  <div className="absolute -left-10 bottom-0 z-10 h-12 w-6 rounded-br-3xl bg-gray-200 shadow-[0_15px_0_0_#faf8f4]"></div>
                  <div className="absolute -top-16 right-0 z-10 h-12 w-6 rounded-br-3xl bg-gray-200 shadow-[0_15px_0_0_#faf8f4]"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="contact" className="code-section bg-[#faf8f4] ">
        <div className="mx-auto max-w-7xl px-5 py-10 lg:py-24 hovered-element">
          <div className="relative w-full overflow-hidden rounded-3xl pb-28 pl-20 pr-5 pt-12 md:pr-48 lg:pt-12">
            <div className="relative z-30 ml-auto space-y-4 lg:max-w-lg lg:space-y-8">
              <h3
                id="contact-header"
                className="text-right text-5xl font-bold text-white lg:text-left"
              >
                Contact Us Anytime
              </h3>
              <form id="contact-us-form">
                <div className="flex flex-col space-y-4 md:space-y-6">
                  <div className="flex flex-col space-y-4 md:flex-row md:space-x-8 md:space-y-0">
                    <div className="w-full">
                      <div className="">
                        <label htmlFor="name" className="text-xl font-medium text-white">
                          Name
                        </label>
                      </div>
                      <div>
                        <input
                          id="name"
                          name="name"
                          type="text"
                          className="w-full rounded border border-white border-b-gray-300 p-2"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col space-y-4 md:flex-row md:space-x-8 md:space-y-0">
                    <div className="w-full">
                      <div>
                        <label htmlFor="email" className="text-xl font-medium text-white">
                          Email Address
                        </label>
                      </div>
                      <div>
                        <input
                          id="email"
                          type="email"
                          name="email"
                          className="w-full rounded border border-white border-b-gray-300 p-2"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="w-full">
                    <div>
                      <label htmlFor="message" className="text-xl font-medium text-white">
                        Message
                      </label>
                    </div>
                    <div className="">
                      <textarea
                        id="message"
                        name="message"
                        rows={4}
                        className="w-full rounded border border-white border-b-gray-300 p-2"
                      ></textarea>
                    </div>
                  </div>
                  <div className="flex justify-end lg:justify-start">
                    <button
                      type="submit"
                      className="items-center rounded-[20px] rounded-br-none bg-white px-8 py-4 text-lg text-gray-800 hover:bg-gray-300"
                    >
                      Send Message
                    </button>
                  </div>
                </div>
              </form>
            </div>
            <div className="absolute bottom-0 right-0 z-30 flex h-24 w-24 items-end justify-end rounded-tl-3xl bg-[#faf8f4] md:top-0 md:h-32 md:w-32 md:items-start md:rounded-bl-3xl md:rounded-tl-none lg:h-40 lg:w-40">
              <div className="primary-color-bg group relative flex h-20 w-20 items-center justify-center rounded-3xl md:h-28 md:w-28 lg:h-36 lg:w-36 bg-indigo-500">
                <MessageCircleMore size={48} className="text-5xl text-white" aria-hidden="true"></MessageCircleMore>
                <div className="primary-color-bg absolute -bottom-16 right-0 z-10 hidden h-12 w-4 rounded-tr-3xl shadow-[0_-16px_0_0_#faf8f4] md:block bg-indigo-500"></div>
                <div className="primary-color-bg absolute -left-8 top-0 z-10 hidden h-12 w-4 rounded-tr-3xl shadow-[0_-25px_0_0_#faf8f4] lg:block bg-indigo-500"></div>
                <div className="primary-color-bg absolute -left-8 bottom-0 z-10 h-12 w-4 rounded-br-3xl shadow-[0_16px_0_0_#faf8f4] md:hidden bg-indigo-500"></div>
                <div className="primary-color-bg shadow-[0_16px_0_0_#faf8f4]lg:hidden absolute -top-16 right-0 z-10 h-12 w-4 rounded-br-3xl bg-indigo-500"></div>
              </div>
            </div>
            <div className="primary-color-bg absolute bottom-0 right-0 top-0 z-20 -mr-20 h-full w-2/3 -skew-x-12 sm:w-3/4 bg-indigo-500"></div>
            <div className="pointer-events-none absolute left-0 top-0 z-10 h-full w-full bg-black/40 sm:w-1/2 lg:w-2/5"></div>
            <img
              className="absolute left-0 top-0 z-0 h-full w-full object-cover sm:w-1/2 lg:w-2/5 clicked-element"
              src="https://media.gettyimages.com/id/1488315525/photo/businessmanman-search-website-for-content-keywords-on-laptop-browse-in-office-optimize-seo.jpg?b=1&amp;s=612x612&amp;w=0&amp;k=20&amp;c=0iQGo7SaUEYMoNxXtZsTO4BSJqr_83Lem6t-EqaOdGU="
              alt=""
              data-media='{"id":"1488315525","src":"iStock","type":"image"}'
            />
            <img
              className="dont-replace absolute bottom-8 right-4 z-20 hidden h-[194px] w-[182px] lg:block"
              src="https://landingsite-static-web-images.s3.us-east-2.amazonaws.com/template10/yellow-star.svg"
              alt=""
            />
          </div>
        </div>
      </section>

      <footer className="primary-color-bg code-section border-t  bg-indigo-500" id="s175h8b">
        <div className="mx-auto max-w-7xl px-5 pb-10 pt-10 lg:pb-24 lg:pt-14">
          <div className="flex flex-col items-center justify-center space-y-5 pb-8 lg:flex-row lg:justify-between lg:space-y-0 lg:pb-14">
            <a className="block" href="/">
              <img className="dont-replace hidden w-32 lg:w-auto" src="" alt="logo" />
              <div id="footer-name-text" className="text-3xl font-bold text-white">
                Vocal
              </div>
            </a>
            <div className="flex flex-col items-center gap-4 text-white sm:flex-row sm:gap-8 lg:gap-14">
              <a
                id="footer-nav-link-one"
                href="/#section-one"
                className="transition ease-linear lg:hover:text-black"
              >
                Explore
              </a>
              <a
                id="footer-nav-link-two"
                href="/#section-two"
                className="transition ease-linear lg:hover:text-black"
              >
                Learn
              </a>
              <a
                id="footer-nav-contact"
                href="/#contact"
                className="transition ease-linear lg:hover:text-black"
              >
                Contact
              </a>
            </div>
            <div className="flex items-center gap-6 lg:gap-10">
              <a
                href="/"
                className="primary-color-text flex h-10 w-10 items-center justify-center rounded-full bg-white transition ease-linear hover:bg-black hover:text-white lg:h-16 lg:w-16 text-indigo-500"
              >
                <InstagramLogoIcon width={32} height={32} className="fa-brands fa-instagram text-xl lg:text-3xl" aria-hidden="true"></InstagramLogoIcon>
              </a>
              <a
                href="/"
                className="primary-color-text flex h-10 w-10 items-center justify-center rounded-full bg-white transition ease-linear hover:bg-black hover:text-white lg:h-16 lg:w-16 text-indigo-500"
              >
                <Facebook size={32} className="fa-brands fa-facebook-f text-xl lg:text-3xl" aria-hidden="true"></Facebook>
              </a>
              <a
                href="/"
                className="primary-color-text flex h-10 w-10 items-center justify-center rounded-full bg-white transition ease-linear hover:bg-black hover:text-white lg:h-16 lg:w-16 text-indigo-500"
              >
                <X size={32} className="fa-brands fa-x-twitter text-xl lg:text-3xl" aria-hidden="true"></X>
              </a>
            </div>
          </div>
          <div className="flex flex-col items-center justify-center space-y-5 md:flex-row md:justify-between lg:space-y-0">
            <p
              id="footer-copyright"
              className="text-center text-lg font-thin text-white md:text-left"
            >
              © Vocal 2024.
            </p>
          </div>
        </div>
      </footer>
    </>
  )
}

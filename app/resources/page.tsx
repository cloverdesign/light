'use client'
import { FoundationCard } from "@/components/resources/foundation-card";
import { ResourceCard } from "@/components/resources/resource-card";
import { Button } from "@/components/ui/button";
import CircleBadge from "@/components/ui/circle-badge";
import { Input } from "@/components/ui/input";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function Resources() {
    const foundation = [
        {
            title: "The new creature",
            content: "Stay connected with our vibrant fellowship through upcoming events"
        },
        {
            title: "The Holy Spirit",
            content: "Stay connected with our vibrant fellowship through upcoming events"
        }
    ]
    return (
        <section className="pt-[150px] font-body">
            <div className="flex flex-col gap-20 mb-50">
                <div className="flex flex-col lg:flex-row items-center justify-between px-8 lg:px-32 gap-40">
                    <div className="flex flex-col gap-1">
                        <h1 className="text-[56px] leading-[72px] lg:text-[112px] lg:leading-[111px]">Resource</h1>
                        <h1 className="flex items-center gap-2 text-[56px] leading-[72px] lg:text-[112px] lg:leading-[111px]">Center
                            <CircleBadge drag={false} icon={{ name: "users-round", size: "size-[57px]" }} className="bg-orange-600 text-orange-200 p-3 lg:p-[19px]" />
                        </h1>
                    </div>

                    <Input
                        icon="search"
                        placeholder="Looking for edifying material?"
                    />
                </div>
                <div className="flex flex-wrap gap-8 lg:px-32 px-8">
                    <ResourceCard
                        title="Devotionals"
                        content="Weekly or monthly posts to encourage spiritual growth."
                        icon={{ name: "book-open", style: "text-yellow-600" }}
                        link="resources/devotionals"
                        className="bg-yellow-400 text-yellow-1000 inset-shadow-juicy-yellow lg:w-[calc(50%-32px)] w-full"
                    />
                    <ResourceCard
                        title="Sermons"
                        content="Video/audio recordings or downloadable notes of live sermons and teachings."
                        icon={{ name: "audio-lines", style: "text-aero-600" }}
                        link="resources/sermons"
                        className="bg-aero-400 text-deep-blue-600 inset-shadow-juicy-blue lg:w-[calc(50%-32px)] w-full"
                    />
                    <ResourceCard
                        title="Foundational School"
                        content="Grow in your walk with God."
                        icon={{ name: "crown", style: "text-orange-500" }}
                        link=""
                        className="bg-orange-400 text-orange-1000 inset-shadow-juicy-orange w-full"
                    />
                </div>
            </div>
            <div className="flex flex-col items-center gap-32 px-8 lg:px-32 mb-50" id="foundation-school">
                <div className="flex flex-col lg:flex-row lg:items-center justify-between lg:gap-32 gap-8">
                    <h1 className="lg:text-[56px] text-[40px]">
                        Are you new to our church or recently
                        <div className="relative inline-block w-fit h-fit">
                            <p>born again?</p>
                            <svg width="269" height="20" viewBox="0 0 269 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M2 13.9476C20.1115 13.9476 38.0852 12.2718 55.984 10.233C73.0113 8.29337 90.2017 7.02025 107.37 6.06804C122.506 5.22851 137.431 4.97147 152.513 3.5916C167.717 2.20052 183.149 1.92483 198.45 2.01568C209.041 2.07857 219.263 3.87399 229.736 4.85796C238.126 5.64628 246.424 6.95984 254.671 8.37564C258.481 9.02975 262.544 9.33686 266.291 10.1485C269.638 10.8738 260.052 10.402 260.012 10.4018C243.171 10.3419 222.785 7.42162 206.894 13.4411C205.969 13.7913 205.464 13.9476 204.44 13.9476C201.76 13.9476 209.759 14.593 212.307 15.2421C215.966 16.1747 219.994 16.7488 223.746 17.4372C224.813 17.633 225.587 17.2135 226.091 18" stroke="#FFC855" strokeWidth="3" strokeLinecap="round" />
                            </svg>
                        </div>
                    </h1>
                    <p className="text-deep-blue-400 lg:w-[40%]">
                        The Foundation School is the perfect place to start your journey of faith, growth, and service in BLW Lighthouse.
                        <br />
                        <br />
                        Our aim is to raise up <span className="font-bold">bold and unapologetic</span>, Spirit-filled believers who will make disciples of all men, impacting the world with the character of the Spirit.
                    </p>
                </div>
                <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
                    <div className="border-yellow-400 border-[3px] rounded-2xl text-yellow-1100 p-8 text-center w-fit flex flex-col gap-4">
                        <h1 className="text-[32px] leading-[40px] lg:text-[42px] lg:leading-[46px] whitespace-nowrap">FOUNDATION <br /> SCHOOL TERM 1</h1>
                        <p className="text-xl">Foundation School Term 4 virtual classes will take place from <span className="font-bold">12 March - 2nd April 2025.</span></p>
                    </div>
                    <svg width="40" height="13" viewBox="0 0 40 13" fill="none" xmlns="http://www.w3.org/2000/svg" className="shrink-0 rotate-90 lg:rotate-0">
                        <path d="M0.325194 6.5C0.325194 10.0472 3.2008 12.9229 6.74805 12.9229C10.2953 12.9229 13.1709 10.0472 13.1709 6.5C13.1709 2.95276 10.2953 0.077147 6.74805 0.077147C3.2008 0.077147 0.325194 2.95276 0.325194 6.5ZM26.8195 6.5C26.8195 10.0472 29.6951 12.9229 33.2423 12.9229C36.7896 12.9229 39.6652 10.0472 39.6652 6.5C39.6652 2.95276 36.7896 0.077147 33.2423 0.077147C29.6951 0.077147 26.8195 2.95276 26.8195 6.5ZM6.74805 7.70428H33.2423V5.29572H6.74805V7.70428Z" fill="#5BC0EB" />
                    </svg>
                    <div className="border-aero-600 border-[3px] rounded-2xl text-deep-blue-600 p-8 text-center w-fit flex flex-col gap-4">
                        <h1 className="text-[32px] leading-[40px] lg:text-[42px] lg:leading-[46px] whitespace-nowrap">WHERE & WHEN?</h1>
                        <p className="text-xl">The classes consist of weekly sessions, Tuesday evenings from <span className="font-bold">18:30-20:00</span>. Lessons take place online, so anyone can attend from anywhere in the world. Recordings are available should you miss a session for any reason.</p>
                    </div>
                    <svg width="40" height="13" viewBox="0 0 40 13" fill="none" xmlns="http://www.w3.org/2000/svg" className="shrink-0 rotate-90 lg:rotate-0">
                        <path d="M0.325194 6.5C0.325194 10.0472 3.2008 12.9229 6.74805 12.9229C10.2953 12.9229 13.1709 10.0472 13.1709 6.5C13.1709 2.95276 10.2953 0.077147 6.74805 0.077147C3.2008 0.077147 0.325194 2.95276 0.325194 6.5ZM26.8195 6.5C26.8195 10.0472 29.6951 12.9229 33.2423 12.9229C36.7896 12.9229 39.6652 10.0472 39.6652 6.5C39.6652 2.95276 36.7896 0.077147 33.2423 0.077147C29.6951 0.077147 26.8195 2.95276 26.8195 6.5ZM6.74805 7.70428H33.2423V5.29572H6.74805V7.70428Z" fill="#FE5715" />
                    </svg>
                    <div className="border-orange-600 border-[3px] rounded-2xl text-orange-1100 p-8 text-center w-fit flex flex-col gap-4">
                        <h1 className="text-[32px] leading-[40px] lg:text-[42px] lg:leading-[46px] whitespace-nowrap">HOW LONG IS <br /> THE COURSE?</h1>
                        <p className="text-xl">The program runs for <span className="font-bold">7 weeks</span>, with interactive classes and practical exercises to help you establish a strong foundation in Christ.</p>
                    </div>
                </div>
                <Button className="w-fit">
                    Register Now
                </Button>
            </div>
            <div className="mb-50 flex flex-col gap-16 items-center">
                <h1 className="lg:text-[56px] text-[40px] lg:leading-[72px] text-center">
                    Start Your Journey <br /> with Foundation <br /> School
                </h1>

                <div className="flex flex-col lg:flex-row relative items-center justify-between px-8 lg:px-32 lg:gap-0 gap-16">
                    <div className="flex flex-col gap-16">
                        <p className="text-deep-blue-400">
                            As you embark on this exciting journey of faith with BLW Lighthouse, we want to personally welcome you to Foundation School, a place designed to equip and empower you for a life of spiritual growth, impact, and service.
                            <br />
                            <br />
                            In this letter, you’ll find everything you need to know about the course, including what to expect, how to prepare, and the incredible transformation that awaits you.
                        </p>

                        <Button variant="secondary-juicy" className="w-fit hidden lg:block">
                            Download Your Letter
                        </Button>
                    </div>
                    <Button className="absolute bottom-4 lg:hidden block">
                        Download Your Letter
                    </Button>
                    <svg width="361" height="181" viewBox="0 0 361 181" fill="none" xmlns="http://www.w3.org/2000/svg" className="shrink-0 lg:hidden block">
                        <path d="M360.265 153.454V377.648H0.595703L0.595703 153.454C0.834038 153.239 1.07237 153.024 1.32154 152.809C46.2152 112.696 91.1089 72.5838 136.013 32.4714L168.709 4.53791C169.749 3.76721 174.31 0.558934 181.265 0.59478C188.436 0.621665 193.03 4.08087 194.005 4.84261C204.286 14.0552 214.567 23.2588 224.848 32.4714C269.752 72.5838 314.646 112.696 359.539 152.809C359.789 153.024 360.027 153.239 360.265 153.454Z" fill="#FFE3AA" />
                        <path d="M323.192 64.1198L23.965 79.3607L30.8293 379.007L333.969 366.667L323.192 64.1198Z" fill="#E3F4FB" />
                        <path d="M0.158203 385.741L0.158203 150.941L135.576 258.44L0.158203 385.741Z" fill="#FFBA2A" />
                        <path d="M359.828 385.741V150.941L224.41 258.44L359.828 385.741Z" fill="#FFBA2A" />
                        <path d="M0.15625 150.261H0.881531C0.632554 150.487 0.394402 150.714 0.15625 150.94L0.15625 150.261Z" fill="#FFEFC2" />
                    </svg>

                    <svg width="768" height="790" viewBox="0 0 768 790" fill="none" xmlns="http://www.w3.org/2000/svg" className="shrink-0 lg:flex hidden">
                        <path d="M634.685 230.53L762.803 571.052L216.512 776.59L88.3927 436.068C88.6318 435.605 88.8709 435.143 89.1265 434.674C134.391 348.093 179.656 261.512 224.938 174.925L258.635 113.814C259.774 112.049 264.868 104.569 275.452 100.649C286.361 96.5916 295.314 99.2208 297.23 99.8206C318.11 107.938 338.985 116.042 359.865 124.16C450.992 159.424 542.103 194.694 633.213 229.965C633.715 230.149 634.2 230.339 634.685 230.53Z" fill="#FFE3AA" />
                        <path d="M527.327 116.028L81.5489 310.175L263.212 761.377L716.591 569.399L527.327 116.028Z" fill="#E3F4FB" />
                        <path d="M164.947 370.141C165.366 366.582 179.774 348.543 183.742 355.289C185.779 358.752 187.376 362.223 191.764 360.606C194.566 359.574 199.848 355.308 200.474 352.493C200.989 350.177 209.52 353.639 210.513 353.639C217.168 353.639 220.532 348.944 224.358 343.37C226.284 340.563 225.975 337.913 227.246 335.119C228.614 332.109 227.658 335.222 227.658 337.457C227.658 339.386 227.657 348.688 229.859 348.688C237.657 348.688 241.365 347.351 247.462 342.27C254.716 336.225 261.805 328.067 265.432 319.166C266.438 316.694 266.44 326.138 266.44 327.646C266.44 331.94 276.27 329.263 278.634 327.876C281.975 325.914 285.896 317.332 289.544 317.332C291.5 317.332 293.456 317.332 295.412 317.332C304.358 317.332 310.665 312.732 318.241 308.439C328.374 302.697 337.906 295.29 347.075 288.085C350.916 285.068 355.617 281.91 358.811 278.183C360.654 276.033 363.376 279.839 364.632 281.026C368.823 284.984 371.23 280.201 375.359 280.201" stroke="#ADDFF5" strokeWidth="3.25386" strokeLinecap="round" />
                        <path d="M170.723 413.874C177.93 409.07 183.114 402.529 189.06 396.363C190.552 394.815 191.509 392.85 193.323 391.641C194.469 390.877 193.53 389.179 195.019 388.295C198.508 386.223 196.079 383.83 194.836 385.819C193.369 388.167 193.827 390.918 193.827 393.658C193.827 395.743 198.474 395.087 200.016 394.85C203.659 394.289 205.768 386.077 210.33 388.478C213.96 390.388 211.9 393.428 216.84 393.245C223.95 392.982 226.292 388.148 231.372 384.673C237.622 380.396 244.337 382.469 251.496 380.456C258.695 378.431 264.162 373.153 269.282 368.033C272.073 365.242 272.507 368.577 274.875 370.783C278.605 374.259 286.816 375.905 291.378 373.259C295.554 370.836 299.958 368.334 302.793 364.365C304.312 362.238 306.589 359.904 308.89 358.589C310.047 357.928 309.066 357.046 310.998 356.939C314.248 356.758 317.3 355.68 320.442 354.922C327.862 353.131 336.407 349.969 342.17 344.745C344.458 342.672 346.936 341.49 348.588 338.786C349.291 337.636 352.117 336.528 352.256 335.485C352.402 334.39 352.194 336.302 352.301 336.677C352.548 337.542 355.141 339.209 355.923 339.611C358.966 341.176 364.651 340.948 367.842 340.069C376.625 337.651 379.559 327.76 384.849 321.412C387.019 318.807 391.143 320.633 394.796 320.633C401.872 320.633 405.212 316.378 410.658 312.748C411.906 311.916 414.507 311.96 415.975 311.373C420.368 309.615 424.5 307.636 427.756 304.13C429.618 302.125 434.277 300.952 436.833 300.05C438.976 299.293 441.276 299.516 443.388 298.812C447.676 297.383 451.252 294.312 454.895 291.752C459.243 288.697 462.814 283.66 466.401 279.742C468.909 277.002 471.681 274.753 474.102 271.949C476.495 269.179 479.984 267.823 483.454 267.823C486.797 267.823 489.804 268.704 493.172 268.648C498.2 268.565 501.463 264.586 506.099 263.743C510.92 262.867 515.607 262.872 520.585 262.872" stroke="#ADDFF5" strokeWidth="3.25386" strokeLinecap="round" />
                        <path d="M193.001 447.706C203.289 447.706 206.507 437.01 214.455 433.036C218.176 431.176 215.798 438.068 219.406 438.583C224.028 439.243 230.344 437.721 231.966 432.853C232.599 430.955 234.258 430.924 234.258 428.727C234.258 427.711 234.152 431.036 234.304 431.569C234.799 433.301 239.96 435.782 241.501 436.062C244.713 436.646 248.347 436.511 250.944 434.503C253.748 432.337 256.813 429.735 259.288 427.26C260.837 425.711 259.029 424.601 261.901 424.601C264.524 424.601 267.39 426.252 270.473 426.252C273.845 426.252 277.005 425.278 280.008 423.776C283.754 421.903 286.78 418.232 290.46 415.983C293.435 414.165 298.864 410.076 302.379 409.795C313.501 408.905 323.34 410.785 332.451 403.331C336.75 399.813 340.513 396.092 343.819 391.596C345.693 389.048 345.121 389.364 348.312 389.074C358.617 388.137 363.866 380.677 371.508 375.093C374.121 373.183 375.077 371.876 378.659 370.967C382.339 370.033 386.311 370.861 389.844 369.683C394.127 368.256 398.281 368.006 401.58 365.008C403.751 363.033 405.361 360.661 408.181 359.415C410.55 358.368 411.579 356.244 413.728 355.289C416.676 353.979 417.89 350.338 421.566 350.338" stroke="#ADDFF5" strokeWidth="3.25386" strokeLinecap="round" />
                        <path d="M258.191 468.334C258.892 465.997 263.92 463.927 265.984 463.337C270.28 462.11 269.821 463.803 271.577 467.509C275.066 474.874 284.327 473.16 289.959 469.847C297.817 465.225 304.841 457.955 310.45 450.914C312.652 448.151 318.408 442.633 319.206 439.041C319.939 435.744 327.436 436.978 330.162 436.978C337.444 436.978 340.793 434.889 346.207 429.369C350.529 424.962 352.929 420.064 357.209 416.395C359.865 414.118 364.059 415.468 366.698 413.416C371.569 409.627 375.966 400.672 382.33 400.672C387.258 400.672 392.051 402.202 397.182 401.314C402.274 400.432 411.362 393.536 413.96 389.12C416.959 384.023 428.989 387.469 433.947 387.469C441.316 387.469 448.838 378.918 454.576 375.092" stroke="#ADDFF5" strokeWidth="3.25386" strokeLinecap="round" />
                        <path d="M220.473 789.132L86.293 432.501L353.407 518.392L220.473 789.132Z" fill="#FFBA2A" />
                        <path d="M766.764 583.594L632.585 226.963L488.334 467.627L766.764 583.594Z" fill="#FFBA2A" />
                        <path d="M220.471 789.132C258.508 682.191 296.528 575.257 334.565 468.316C344.069 443.353 353.574 418.39 363.078 393.427C364.074 391.282 368.557 382.227 379.141 378.306C390.061 374.28 399.666 378.591 401.73 379.584C424.32 392.246 446.903 404.889 469.493 417.551C568.588 472.896 667.668 528.248 766.763 583.594L220.471 789.132Z" fill="#FFD67F" />
                        <path d="M85.9043 431.469L87.0059 431.054C86.757 431.54 86.5245 432.02 86.292 432.499L85.9043 431.469Z" fill="#FFEFC2" />
                        <g clip-path="url(#clip0_2518_1517)">
                            <path fill-rule="evenodd" clip-rule="evenodd" d="M462.866 350.244C463.759 347.804 465.585 345.819 467.942 344.725C469.282 344.103 470.592 343.728 472.028 343.694C473.035 343.67 474.053 343.815 475.135 344.111C475.606 343.094 476.153 342.223 476.822 341.469C477.775 340.394 478.907 339.636 480.247 339.014C482.604 337.92 485.299 337.807 487.739 338.7C490.179 339.594 492.165 341.42 493.258 343.777C494.998 347.525 493.801 351.423 492.692 354.36L487.566 368.365C487.28 369.147 486.414 369.549 485.633 369.262L471.632 364.138C468.652 363.103 464.924 361.496 463.179 357.737C462.085 355.38 461.973 352.685 462.866 350.244ZM469.211 347.459C467.579 348.217 466.315 349.591 465.697 351.281C465.078 352.97 465.156 354.836 465.914 356.467C467.086 358.993 469.673 360.267 472.632 361.294C472.64 361.297 472.648 361.3 472.656 361.303L485.253 365.913L489.864 353.316C489.866 353.312 489.868 353.307 489.869 353.302C490.982 350.356 491.689 347.556 490.524 345.046C489.767 343.414 488.392 342.15 486.703 341.531C485.013 340.913 483.148 340.991 481.516 341.749C480.45 342.243 479.689 342.779 479.077 343.469C478.458 344.168 477.921 345.102 477.413 346.489C477.127 347.271 476.262 347.673 475.48 347.387C474.093 346.879 473.033 346.685 472.099 346.708C471.177 346.73 470.277 346.965 469.211 347.459Z" fill="#ADDFF5" />
                        </g>
                        <defs>
                            <clipPath id="clip0_2518_1517">
                                <rect width="36.1754" height="36.1754" fill="white" transform="translate(456.416 346.75) rotate(-24.8964)" />
                            </clipPath>
                        </defs>
                    </svg>
                </div>
            </div>
            <div className="mb-50 lg:pl-[127px] px-8 flex flex-col lg:flex-row lg:items-center lg:justify-between overflow-x-hidden gap-10">
                <div className="flex flex-col gap-4 shrink-0">
                    <h2 className="lg:text-[56px] text-[40px]">What
                        <div className="relative inline-block ml-2 w-fit h-fit">
                            <p>You&apos;ll</p>
                            <svg className="absolute left-2 bottom-0 w-full" width="119" height="13" viewBox="0 0 119 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M1.73944 8.84912C9.59305 8.84912 17.3869 7.91732 25.1483 6.78363C32.5318 5.70515 39.986 4.99725 47.4305 4.46779C53.9941 4.00098 60.4657 3.85806 67.0057 3.0908C73.5987 2.31731 80.2905 2.16401 86.9251 2.21453C91.5177 2.2495 95.9504 3.24781 100.492 3.79494C104.13 4.23327 107.728 4.96366 111.304 5.75089C112.956 6.1146 114.718 6.28537 116.343 6.73669C117.794 7.13995 113.637 6.8776 113.62 6.87752C106.317 6.84418 97.4776 5.22042 90.5866 8.56746C90.1857 8.76221 89.9667 8.84912 89.5226 8.84912C88.3605 8.84912 91.8291 9.20799 92.9338 9.56891C94.5208 10.0874 96.2673 10.4067 97.8941 10.7894C98.3569 10.8983 98.6925 10.665 98.9112 11.1024" stroke="#FFC855" strokeWidth="3" strokeLinecap="round" />
                            </svg>
                        </div>
                        <br /> Learn
                    </h2>
                    <p className="text-deep-blue-400 lg:w-[60%] w-full md:w-[30%]">Topics covered in Foundation School.</p>
                </div>
                <div className="py-2 flex flex-col gap-10 w-max">
                    <div className="flex items-center gap-8">
                        {
                            [...foundation].map((item, index) => (
                                <FoundationCard key={index} title={item.title} content={item.content} index={index + 1} />
                            ))
                        }
                    </div>
                    <div className="flex items-center lg:ml-20 gap-8">
                        <Button className="bg-aero-600 rounded-full text-aero-100 px-4 pb-3 pt-2 hover:bg-aero-400">
                            <ChevronLeft />
                        </Button>
                        <Button className="bg-aero-600 rounded-full text-aero-100 px-4 pb-3 pt-2 hover:bg-aero-400">
                            <ChevronRight />
                        </Button>
                    </div>
                </div>
            </div>
        </section>
    )
}
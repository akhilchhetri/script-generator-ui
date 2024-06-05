import Image from "next/image"
import Link from "next/link"
const Footer = () => {
  return (
    <div className="relative min-h-[400px] w-full gap-4 bg-[#83D5D6] px-5 md:min-h-[600px]">
      <div className="absolute top-10 flex flex-col items-center justify-center md:left-10 md:top-[22vh] md:px-5">
        <h1 className="font-montHeavy text-[82px] capitalize leading-[100px] text-white">OIAI</h1>
        <span className="w-full text-center font-montHeavy text-[18px] leading-[25px] text-white md:w-[50%]">
          upskilling a generation using Artificial Intelligence
        </span>
      </div>
      {/* socials */}
      <div className="absolute bottom-0 left-1/2 mt-10 flex -translate-x-1/2 flex-col items-center justify-center py-10 text-center md:mt-0">
        <div className="flex flex-row gap-5">
          <div className="max-h-[50px] max-w-[50px] cursor-pointer rounded-md bg-[#A1E2E3] p-[8px]">
            <svg width="19" height="20" viewBox="0 0 19 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <g filter="url(#filter0_i_567_558)">
                <g filter="url(#filter1_i_567_558)">
                  <path
                    d="M13.9394 2.81818H16.3521L11.081 8.84278L17.2821 17.0409H12.4267L8.62372 12.0688L4.27229 17.0409H1.85808L7.49611 10.5969L1.54736 2.81818H6.52605L9.96358 7.36289L13.9394 2.81818ZM13.0926 15.5968H14.4295L5.7996 4.18648H4.36492L13.0926 15.5968Z"
                    fill="#404040"
                  />
                </g>
              </g>
              <defs>
                <filter
                  id="filter0_i_567_558"
                  x="0.0507812"
                  y="0.657959"
                  width="18.6055"
                  height="22.6053"
                  filterUnits="userSpaceOnUse"
                  color-interpolation-filters="sRGB"
                >
                  <feFlood flood-opacity="0" result="BackgroundImageFix" />
                  <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
                  <feColorMatrix
                    in="SourceAlpha"
                    type="matrix"
                    values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                    result="hardAlpha"
                  />
                  <feOffset dy="4" />
                  <feGaussianBlur stdDeviation="7.5" />
                  <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
                  <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.2 0" />
                  <feBlend mode="normal" in2="shape" result="effect1_innerShadow_567_558" />
                </filter>
                <filter
                  id="filter1_i_567_558"
                  x="1.54736"
                  y="2.81818"
                  width="15.7349"
                  height="18.2227"
                  filterUnits="userSpaceOnUse"
                  color-interpolation-filters="sRGB"
                >
                  <feFlood flood-opacity="0" result="BackgroundImageFix" />
                  <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
                  <feColorMatrix
                    in="SourceAlpha"
                    type="matrix"
                    values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                    result="hardAlpha"
                  />
                  <feOffset dy="4" />
                  <feGaussianBlur stdDeviation="2" />
                  <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
                  <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0" />
                  <feBlend mode="normal" in2="shape" result="effect1_innerShadow_567_558" />
                </filter>
              </defs>
            </svg>
          </div>
          <div className="max-h-[50px] max-w-[50px] cursor-pointer rounded-md bg-[#A1E2E3] p-[8px]">
            <svg width="21" height="21" viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg">
              <g filter="url(#filter0_i_567_797)">
                <path
                  d="M7.09149 2.47415C4.49043 2.47415 2.37402 4.5918 2.37402 7.19351V13.9338C2.37402 16.5352 4.49167 18.6519 7.09338 18.6519H13.8337C16.4351 18.6519 18.5518 16.5343 18.5518 13.9326V7.19162C18.5518 4.59055 16.4342 2.47415 13.8324 2.47415H7.09149ZM15.3162 5.0626C15.6735 5.0626 15.9634 5.3525 15.9634 5.70971C15.9634 6.06691 15.6735 6.35682 15.3162 6.35682C14.959 6.35682 14.6691 6.06691 14.6691 5.70971C14.6691 5.3525 14.959 5.0626 15.3162 5.0626ZM10.4629 6.35682C12.7828 6.35682 14.6691 8.24315 14.6691 10.563C14.6691 12.8829 12.7825 14.7693 10.4629 14.7693C8.14302 14.7693 6.25669 12.8826 6.25669 10.563C6.25669 8.24347 8.14302 6.35682 10.4629 6.35682ZM10.4629 7.65104C8.85452 7.65104 7.55091 8.95465 7.55091 10.563C7.55091 12.1714 8.85452 13.475 10.4629 13.475C12.0713 13.475 13.3749 12.1714 13.3749 10.563C13.3749 8.95465 12.0713 7.65104 10.4629 7.65104Z"
                  fill="#272727"
                />
              </g>
              <defs>
                <filter
                  id="filter0_i_567_797"
                  x="0.108887"
                  y="0.20929"
                  width="20.7075"
                  height="24.7076"
                  filterUnits="userSpaceOnUse"
                  color-interpolation-filters="sRGB"
                >
                  <feFlood flood-opacity="0" result="BackgroundImageFix" />
                  <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
                  <feColorMatrix
                    in="SourceAlpha"
                    type="matrix"
                    values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                    result="hardAlpha"
                  />
                  <feOffset dy="4" />
                  <feGaussianBlur stdDeviation="7.5" />
                  <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
                  <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.2 0" />
                  <feBlend mode="normal" in2="shape" result="effect1_innerShadow_567_797" />
                </filter>
              </defs>
            </svg>
          </div>
          <div className="max-h-[50px] max-w-[50px] cursor-pointer rounded-md bg-[#A1E2E3] p-[8px]">
            <svg xmlns="http://www.w3.org/2000/svg" width="19" height="19" viewBox="0 0 19 19" fill="none">
              <g clip-path="url(#clip0_567_1037)" filter="url(#filter0_i_567_1037)">
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M1.06494 2.48955C1.06494 2.11166 1.21506 1.74924 1.48227 1.48203C1.74948 1.21482 2.1119 1.0647 2.48979 1.0647H16.6934C16.8806 1.06439 17.0661 1.10103 17.2392 1.17251C17.4123 1.24398 17.5696 1.3489 17.7021 1.48125C17.8346 1.6136 17.9397 1.77079 18.0114 1.94381C18.083 2.11682 18.1199 2.30228 18.1198 2.48955V16.6931C18.12 16.8804 18.0832 17.0659 18.0117 17.239C17.9401 17.4121 17.8351 17.5694 17.7027 17.7019C17.5703 17.8344 17.4131 17.9395 17.24 18.0111C17.0669 18.0828 16.8814 18.1196 16.6941 18.1195H2.48979C2.30262 18.1195 2.11727 18.0826 1.94435 18.011C1.77143 17.9393 1.61432 17.8343 1.482 17.7019C1.34968 17.5695 1.24474 17.4124 1.17318 17.2394C1.10162 17.0664 1.06484 16.8811 1.06494 16.6939V2.48955ZM7.81555 7.56724H10.1249V8.72697C10.4583 8.06028 11.311 7.46026 12.5925 7.46026C15.0491 7.46026 15.6313 8.78821 15.6313 11.2247V15.7381H13.1452V11.7798C13.1452 10.3921 12.8118 9.60917 11.9653 9.60917C10.7908 9.60917 10.3025 10.4534 10.3025 11.7798V15.7381H7.81555V7.56724ZM3.55185 15.6318H6.03875V7.46026H3.55185V15.6311V15.6318ZM6.39458 4.79505C6.39926 5.00799 6.36137 5.21971 6.28313 5.4178C6.20488 5.61589 6.08786 5.79636 5.93893 5.94861C5.78999 6.10086 5.61215 6.22183 5.41583 6.30441C5.21951 6.387 5.00867 6.42954 4.79569 6.42954C4.5827 6.42954 4.37186 6.387 4.17554 6.30441C3.97923 6.22183 3.80138 6.10086 3.65244 5.94861C3.50351 5.79636 3.38649 5.61589 3.30824 5.4178C3.23 5.21971 3.19211 5.00799 3.19679 4.79505C3.206 4.3771 3.37849 3.97936 3.67734 3.68702C3.97619 3.39468 4.37763 3.23099 4.79569 3.23099C5.21374 3.23099 5.61518 3.39468 5.91403 3.68702C6.21288 3.97936 6.38537 4.3771 6.39458 4.79505Z"
                  fill="#222222"
                />
              </g>
              <defs>
                <filter
                  id="filter0_i_567_1037"
                  x="0.289551"
                  y="0.289459"
                  width="18.6055"
                  height="22.6053"
                  filterUnits="userSpaceOnUse"
                  color-interpolation-filters="sRGB"
                >
                  <feFlood flood-opacity="0" result="BackgroundImageFix" />
                  <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
                  <feColorMatrix
                    in="SourceAlpha"
                    type="matrix"
                    values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                    result="hardAlpha"
                  />
                  <feOffset dy="4" />
                  <feGaussianBlur stdDeviation="7.5" />
                  <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
                  <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.2 0" />
                  <feBlend mode="normal" in2="shape" result="effect1_innerShadow_567_1037" />
                </filter>
                <clipPath id="clip0_567_1037">
                  <rect width="18.6053" height="18.6053" fill="white" transform="translate(0.289551 0.289459)" />
                </clipPath>
              </defs>
            </svg>
          </div>
        </div>
        <span className="mt-5 font-montHeavy text-[18px] leading-[25px] text-white">info@oiedu.co.uk </span>
        <br />
        <span className="font-montHeavy text-[18px] leading-[25px] text-white">
          ©{" "}
          <Link href="https://www.portfolio.oiedu.co.uk/" target="_blank">
            Otermans Institute
          </Link>{" "}
          2024 {" "}
        </span>
      </div>

      <div className="absolute bottom-0 right-0 w-auto">
        <Image src={"/images/chatbot4.png"} alt="image" height={100} width={100} className="w-[100px] md:w-[405px]" />
      </div>
    </div>
  )
}
export default Footer
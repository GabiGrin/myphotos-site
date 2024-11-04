// First, let's define the IconProps interface at the top of the file
interface IconProps {
  className?: string;
}

export function EditingIcon({ className }: IconProps) {
  return (
    <svg
      width="21"
      height="20"
      viewBox="0 0 21 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M7.52344 12.7083V10.2083L15.2318 2.5L17.7318 5L10.0234 12.7083H7.52344Z"
        stroke="black"
        strokeWidth="1.25"
        strokeLinecap="square"
      />
      <path
        d="M9.60681 3.125H3.35681V16.875H17.1068V10.625"
        stroke="black"
        strokeWidth="1.25"
        strokeLinecap="square"
      />
    </svg>
  );
}

export function ImagesIcon({ className }: IconProps) {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M14.6901 14.4583L9.89848 9.66667L8.23181 11.3333L4.89848 8L1.77348 11.125M1.35681 1.125H15.1068V14.875H1.35681V1.125ZM11.3568 5.5C11.3568 6.19036 10.7971 6.75 10.1068 6.75C9.41648 6.75 8.85681 6.19036 8.85681 5.5C8.85681 4.80964 9.41648 4.25 10.1068 4.25C10.7971 4.25 11.3568 4.80964 11.3568 5.5Z"
        stroke="black"
        strokeWidth="1.25"
        strokeLinecap="square"
      />
    </svg>
  );
}

export function ChainIcon({ className }: IconProps) {
  return (
    <svg
      width="21"
      height="20"
      viewBox="0 0 21 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M5.85685 9.375H5.23185V10.625H5.85685V9.375ZM14.6069 10.625H15.2319V9.375H14.6069V10.625ZM18.7735 5.625H19.3985V5H18.7735V5.625ZM18.7735 14.375V15H19.3985V14.375H18.7735ZM13.3569 13.75H12.7319V15H13.3569V13.75ZM13.3569 5H12.7319V6.25H13.3569V5ZM1.69019 5.625V5H1.06519V5.625H1.69019ZM1.69019 14.375H1.06519V15H1.69019V14.375ZM7.10685 15H7.73185V13.75H7.10685V15ZM7.10685 6.25H7.73185V5H7.10685V6.25ZM5.85685 10.625H14.6069V9.375H5.85685V10.625ZM18.1485 5.625V14.375H19.3985V5.625H18.1485ZM18.7735 13.75H13.3569V15H18.7735V13.75ZM13.3569 6.25H18.7735V5H13.3569V6.25ZM1.06519 5.625V14.375H2.31519V5.625H1.06519ZM1.69019 15H7.10685V13.75H1.69019V15ZM7.10685 5H1.69019V6.25H7.10685V5Z"
        fill="black"
      />
    </svg>
  );
}

export function ShareIcon({ className }: IconProps) {
  return (
    <svg
      width="21"
      height="20"
      viewBox="0 0 21 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M7.71486 8.69341L11.8721 6.31782M7.71486 11.3065L11.8721 13.6821M17.0686 5.01128C17.0686 6.50366 15.8588 7.71347 14.3664 7.71347C12.874 7.71347 11.6642 6.50366 11.6642 5.01128C11.6642 3.51889 12.874 2.30908 14.3664 2.30908C15.8588 2.30908 17.0686 3.51889 17.0686 5.01128ZM17.0686 14.9886C17.0686 16.481 15.8588 17.6908 14.3664 17.6908C12.874 17.6908 11.6642 16.481 11.6642 14.9886C11.6642 13.4963 12.874 12.2864 14.3664 12.2864C15.8588 12.2864 17.0686 13.4963 17.0686 14.9886ZM7.9227 9.99994C7.9227 11.4923 6.71289 12.7021 5.22051 12.7021C3.72812 12.7021 2.51831 11.4923 2.51831 9.99994C2.51831 8.50758 3.72812 7.29775 5.22051 7.29775C6.71289 7.29775 7.9227 8.50758 7.9227 9.99994Z"
        stroke="black"
        strokeWidth="1.24717"
      />
    </svg>
  );
}

export function EmailIcon({ className }: IconProps) {
  return (
    <svg
      width="21"
      height="20"
      viewBox="0 0 21 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M17.9001 3.97197H18.5237V3.34839H17.9001V3.97197ZM17.9001 16.0279V16.6515H18.5237V16.0279H17.9001ZM2.51841 16.0279H1.89483V16.6515H2.51841V16.0279ZM2.51841 3.97197V3.34839H1.89483V3.97197H2.51841ZM10.2093 10.5493L9.92866 11.1062L10.2093 11.2475L10.4899 11.1062L10.2093 10.5493ZM3.00687 6.22201L2.44999 5.94142L1.88879 7.05519L2.44568 7.33579L3.00687 6.22201ZM17.9729 7.33579L18.5298 7.05519L17.9686 5.94142L17.4117 6.22201L17.9729 7.33579ZM17.2766 3.97197V16.0279H18.5237V3.97197H17.2766ZM17.9001 15.4043H2.51841V16.6515H17.9001V15.4043ZM3.142 16.0279V3.97197H1.89483V16.0279H3.142ZM2.51841 4.59556H17.9001V3.34839H2.51841V4.59556ZM10.4899 9.99238L3.00687 6.22201L2.44568 7.33579L9.92866 11.1062L10.4899 9.99238ZM17.4117 6.22201L9.92866 9.99238L10.4899 11.1062L17.9729 7.33579L17.4117 6.22201Z"
        fill="black"
      />
    </svg>
  );
}

export function WebsiteIcon({ className }: IconProps) {
  return (
    <svg
      width="21"
      height="22"
      viewBox="0 0 21 22"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M4.07801 7.52969C3.498 8.5598 3.16829 9.74944 3.17117 11.016C3.17511 12.747 3.79964 14.3316 4.8337 15.5597L7.57064 12.8102C6.24215 11.4168 5.19928 9.98198 4.57104 8.73258C4.36326 8.31936 4.19487 7.91475 4.07801 7.52969ZM6.75657 4.83908C7.14212 4.95419 7.54746 5.12072 7.96158 5.3266C9.21383 5.94915 10.6533 6.98547 12.0528 8.30762L14.7895 5.55844C13.5568 4.52997 11.9694 3.91266 10.2384 3.91659C8.97196 3.91947 7.78395 4.25452 6.75657 4.83908ZM15.6743 4.66962C14.2124 3.41686 12.3118 2.66187 10.2355 2.6666C5.63317 2.67706 1.91071 6.4165 1.92117 11.0189C1.92589 13.0951 2.68952 14.9923 3.94892 16.4484L3.3446 17.0556C3.10108 17.3002 3.10198 17.6959 3.34661 17.9394C3.59124 18.1829 3.98698 18.182 4.23049 17.9374L4.83482 17.3303C6.29668 18.583 8.19725 19.3379 10.2734 19.3332C14.8758 19.3228 18.5983 15.5833 18.5878 10.981C18.5831 8.90477 17.8195 7.00765 16.5602 5.5515L17.1646 4.94432C17.4081 4.69969 17.4072 4.30396 17.1626 4.06044C16.918 3.81692 16.5222 3.81782 16.2787 4.06245L15.6743 4.66962ZM15.6754 6.44033L12.9387 9.18949C14.2672 10.5829 15.3101 12.0178 15.9384 13.2672C16.1461 13.6803 16.3144 14.0847 16.4312 14.4696C17.011 13.4396 17.3407 12.2501 17.3378 10.9838C17.3339 9.25286 16.7093 7.66835 15.6754 6.44033ZM13.7526 17.1606C13.3671 17.0455 12.9619 16.879 12.5479 16.6732C11.2956 16.0506 9.85603 15.0142 8.45653 13.6921L5.71961 16.4415C6.95231 17.4698 8.53965 18.0872 10.2706 18.0832C11.5371 18.0803 12.7252 17.7452 13.7526 17.1606ZM9.33876 12.8059C10.6624 14.0528 11.9933 15.0015 13.1043 15.5539C13.7258 15.8629 14.2462 16.0315 14.6386 16.0771C15.04 16.1238 15.1978 16.0333 15.2541 15.9766C15.3104 15.9201 15.4003 15.7618 15.3518 15.3607C15.3044 14.9684 15.1334 14.4488 14.8216 13.8288C14.2642 12.7203 13.3095 11.3937 12.0566 10.0757L9.33876 12.8059ZM11.1706 9.19383C9.84696 7.94694 8.5161 6.99824 7.4051 6.4459C6.78362 6.13692 6.26328 5.96826 5.87083 5.92266C5.46946 5.87602 5.31163 5.96658 5.2553 6.02316C5.19897 6.07975 5.10913 6.238 5.15759 6.63915C5.20498 7.03139 5.376 7.55095 5.68781 8.17103C6.24519 9.2795 7.19994 10.606 8.45282 11.924L11.1706 9.19383Z"
        fill="black"
      />
    </svg>
  );
}

export function HeadingIcon({ className }: IconProps) {
  return (
    <svg
      width="21"
      height="20"
      viewBox="0 0 21 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M5.02348 3.125H3.35681M5.02348 3.125H6.69014M5.02348 3.125V10M5.02348 10V16.875M5.02348 10H15.4401M5.02348 16.875H6.69014M5.02348 16.875H3.35681M15.4401 3.125H13.7735M15.4401 3.125H17.1068M15.4401 3.125V10M15.4401 10V16.875M15.4401 16.875H13.7735M15.4401 16.875H17.1068"
        stroke="black"
        strokeWidth="1.25"
        strokeLinecap="square"
      />
    </svg>
  );
}

export function TextIcon({ className }: IconProps) {
  return (
    <svg
      width="21"
      height="20"
      viewBox="0 0 21 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M3.35681 5.20833V3.125H10.2318M10.2318 3.125H17.1068V5.20833M10.2318 3.125V16.875M10.2318 16.875H8.35681M10.2318 16.875H12.1068"
        stroke="black"
        strokeWidth="1.25"
        strokeLinecap="square"
      />
    </svg>
  );
}

export function SortIcon({ className }: IconProps) {
  return (
    <svg
      width="21"
      height="20"
      viewBox="0 0 21 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M2.94012 6.45833L6.27346 3.125L9.60679 6.45833M10.8568 13.5417L14.1901 16.875L17.5235 13.5417M6.27346 4.16667V16.875M14.1901 3.125V16.0417"
        stroke="black"
        strokeWidth="1.25"
        strokeLinecap="square"
      />
    </svg>
  );
}

export function ColumnsIcon({ className }: IconProps) {
  return (
    <svg
      width="21"
      height="20"
      viewBox="0 0 21 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M8.35681 3.95825H12.1068V16.0416H8.35681V3.95825Z"
        stroke="black"
        strokeWidth="1.25"
      />
      <path
        d="M2.5235 3.95825H6.2735V12.5892H2.5235V3.95825Z"
        stroke="black"
        strokeWidth="1.25"
      />
      <path
        d="M14.1901 3.95825H17.9401V10.863H14.1901V3.95825Z"
        stroke="black"
        strokeWidth="1.25"
      />
    </svg>
  );
}

export function SaveDeployIcon({ className }: IconProps) {
  return (
    <svg
      width="21"
      height="20"
      viewBox="0 0 21 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M4.87303 15.7416C3.30068 15.1044 2.19019 13.5491 2.19019 11.7315C2.19019 9.544 3.79872 7.73636 5.88504 7.45196C6.5776 5.41891 8.48604 3.95825 10.7319 3.95825C12.9777 3.95825 14.8861 5.41891 15.5787 7.45196C17.665 7.73636 19.2735 9.544 19.2735 11.7315C19.2735 13.5491 18.163 15.1044 16.5907 15.7416"
        stroke="black"
        strokeWidth="1.25"
        strokeLinecap="square"
      />
      <path
        d="M8.02344 14.1667L10.1068 16.4583L14.2734 11.875"
        stroke="black"
        strokeWidth="1.25"
        strokeLinecap="square"
      />
    </svg>
  );
}

export const AlbumIcon = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
    <rect x="7" y="7" width="10" height="10" rx="2" ry="2" />
  </svg>
);

export const CheckIcon = (props: any) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

interface NavLink {
  label: string;
  icon?: React.ReactNode;
  onClick?: () => void;
}

interface NavLinksProps {
  links: NavLink[];
}

export const NavLinks = ({ links }: NavLinksProps) => {
  return (
    <ul className="flex gap-6 text-gray-700 font-medium items-center">
      {links.map((link, index) => (
        <li
          key={index}
          onClick={link.onClick}
          className={`hover:text-blue-500 cursor-pointer ${
            link.icon ? "text-3xl flex items-center" : ""
          }`}
        >
          {link.icon ?? link.label}
        </li>
      ))}
    </ul>
  );
};

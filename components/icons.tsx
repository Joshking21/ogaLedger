import {
  ArrowLeft,
  Bell,
  ChevronRight,
  Clock,
  Compass,
  Heart,
  House,
  LucideIcon,
  MapPin,
  MessageSquare,
  Minus,
  Phone,
  Plus,
  PlusCircle,
  Search,
  Settings,
  ShoppingCart,
  Star,
  Trash2,
  User,
  Users,
  Wallet,
} from "lucide-react-native"; // Import from root, not /icons
import { cssInterop } from "nativewind";

// 1. Create the interop function
function iconWithClassName(icon: LucideIcon) {
  cssInterop(icon, {
    className: {
      target: "style",
      nativeStyleToProp: {
        color: true, // This maps Tailwind 'text-...' to Lucide 'color'
        fontSize: "size", // This maps Tailwind 'w-...' and 'h-...' to Lucide 'size'
      },
    } as any, // <--- Add 'as any' here to bypass the strict type check
  });
}
// 2. Wrap your icons
iconWithClassName(Wallet);
iconWithClassName(Users);
iconWithClassName(Settings);
iconWithClassName(PlusCircle);
iconWithClassName(House);
iconWithClassName(Bell);
iconWithClassName(MapPin);
iconWithClassName(Search);
iconWithClassName(Heart);
iconWithClassName(Trash2);
iconWithClassName(Plus);
iconWithClassName(Minus);
iconWithClassName(ChevronRight);
iconWithClassName(Phone);
iconWithClassName(MessageSquare);
iconWithClassName(Clock);
iconWithClassName(ArrowLeft);
iconWithClassName(User);
iconWithClassName(Compass);
iconWithClassName(Star);
iconWithClassName(ShoppingCart);

// 3. Export them
export {
  ArrowLeft,
  Bell,
  ChevronRight,
  Clock,
  Compass,
  Heart,
  House,
  MapPin,
  MessageSquare,
  Minus,
  Phone,
  Plus,
  PlusCircle,
  Search,
  Settings,
  ShoppingCart,
  Star,
  Trash2,
  User,
  Users,
  Wallet,
};

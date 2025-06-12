import {
  Landmark,
  Banknote,
  BookOpen,
  Briefcase,
  Building,
  Globe,
  Heart,
  ShieldCheck,
  Cpu,
  Scale,
  Phone,
  Users,
} from "lucide-react"

export function getCategoryIcon(category: string) {
  switch (category) {
    case "Finance":
      return Banknote
    case "Education":
      return BookOpen
    case "Labor":
      return Briefcase
    case "Infrastructure":
      return Building
    case "Environment":
      return Globe
    case "Healthcare":
      return Heart
    case "Defense":
      return ShieldCheck
    case "Constitutional":
      return Landmark
    case "Technology":
      return Cpu
    case "Law & Justice":
      return Scale
    case "Communication":
      return Phone
    case "Social Justice":
      return Users
    default:
      return Landmark
  }
}

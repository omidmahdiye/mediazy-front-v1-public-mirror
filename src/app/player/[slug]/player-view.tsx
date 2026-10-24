"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  X,
  Bookmark,
  NotebookPen,
  Settings,
  Play,
  Pause,
  RotateCcw,
  RotateCw,
  Volume2,
  Maximize,
  PictureInPicture2,
  RectangleHorizontal,
  Captions,
  Mic,
  CheckCircle2,
  PlayCircle,
  Lock,
  FileText,
  HelpCircle,
  ChevronDown,
  FileDown,
  ThumbsUp,
  MessageCircleQuestion,
  Plus,
  PanelRightClose,
} from "lucide-react";
import { curriculum, getCourse, notes } from "@/lib/data";
import { Num, ProgressBar, Avatar } from "@/components/ui";

const SPEEDS = ["0.5x", "0.75x", "1x", "1.25x", "1.5x", "2x"];

const qa = [
  {
    name: "حمید رضوی",
    initials: "ح‌ر",
    color: "bg-violet-600",
    q: "چرا در این درس از prop drilling اجتناب شده؟ در پروژه‌های کوچک هم باید همین کار را کرد؟",
    a: "سوال خوبی است. در پروژه‌های کوچک prop drilling تا دو سه سطح کاملا طبیعی است؛ الگوی composition وقتی ارزش دارد که عمق درخت زیاد شود.",
    votes: 12,
  },
  {
    name: "نازنین اکبری",
    initials: "ن‌ا",
    color: "bg-rose-500",
    q: "فایل تمرین این درس کجاست؟",
    a: "از تب «فایل‌های ضمیمه» همین درس می‌توانید فایل starter را دانلود کنید.",
    votes: 5,
  },
];

const files = [
  { name: "slides-components.pdf", size: "2.4 MB" },
  { name: "starter-project.zip", size: "8.1 MB" },
  { name: "cheatsheet-props.pdf", size: "640 KB" },
];

export default function PlayerView({ slug }: { slug: string }) {
  const course = getCourse(slug)!;
  const [currentId, setCurrentId] = useState(6);
  const [openSection, setOpenSection] = useState(1);
  const [tab, setTab] = useState(0);
  const [playing, setPlaying] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const { currentLesson, completedCount, totalCount } = useMemo(() => {
    let lesson = curriculum[0].lessons[0];
    let completed = 0;
    let total = 0;
    for (const sec of curriculum) {
      for (const l of sec.lessons) {
        total += 1;
        if (l.comple
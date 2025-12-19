"use client";

import st from "./TeamTasksPanel.module.scss";
import { useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import EditIcon from "@mui/icons-material/Edit";

interface Task {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  createdAt: string;
  createdBy: string;
}

interface Department {
  id: string;
  name: string;
  displayName: string;
}

const DEPARTMENTS: Department[] = [
  { id: "1", name: "frontend", displayName: "프론트엔드팀" },
  { id: "2", name: "backend", displayName: "백엔드팀" },
  { id: "3", name: "design", displayName: "디자인팀" },
  { id: "4", name: "planning", displayName: "기획팀" },
];

// 더미 데이터
const INITIAL_TASKS: Record<string, Task[]> = {
  frontend: [
    {
      id: "1",
      title: "대시보드 UI 개선",
      description: "사용자 피드백을 반영한 대시보드 UI 개선 작업",
      completed: true,
      createdAt: "2025-12-15",
      createdBy: "테스트",
    },
    {
      id: "2",
      title: "반응형 레이아웃 구현",
      description: "모바일/태블릿 대응 반응형 레이아웃 작업",
      completed: false,
      createdAt: "2025-12-18",
      createdBy: "테스트2",
    },
  ],
  backend: [
    {
      id: "3",
      title: "API 성능 최적화",
      description: "쿼리 최적화 및 캐싱 전략 수립",
      completed: false,
      createdAt: "2025-12-17",
      createdBy: "테스트3",
    },
  ],
  design: [
    {
      id: "4",
      title: "디자인 시스템 구축",
      description: "일관된 UI/UX를 위한 디자인 시스템 정립",
      completed: true,
      createdAt: "2025-12-10",
      createdBy: "테스트4",
    },
  ],
  planning: [
    {
      id: "5",
      title: "Q1 로드맵 수립",
      description: "2025년 로드맵 기획",
      completed: false,
      createdAt: "2025-12-19",
      createdBy: "테스트5",
    },
  ],
};

interface TeamTasksPanelProps {
  userRole?: string;
}

export const TeamTasksPanel = ({ userRole }: TeamTasksPanelProps) => {
  const [tasks, setTasks] = useState<Record<string, Task[]>>(INITIAL_TASKS);
  const [selectedDept, setSelectedDept] = useState<string>("frontend");
  const [isAddingTask, setIsAddingTask] = useState(false);
  const [newTask, setNewTask] = useState({ title: "", description: "" });

  const currentTasks = tasks[selectedDept] || [];
  const completedCount = currentTasks.filter((task) => task.completed).length;
  const totalCount = currentTasks.length;

  // 할일 완료 토글
  const toggleTaskCompletion = (taskId: string) => {
    setTasks((prev) => ({
      ...prev,
      [selectedDept]: prev[selectedDept].map((task) =>
        task.id === taskId ? { ...task, completed: !task.completed } : task
      ),
    }));
  };

  // 할일 삭제
  const deleteTask = (taskId: string) => {
    setTasks((prev) => ({
      ...prev,
      [selectedDept]: prev[selectedDept].filter((task) => task.id !== taskId),
    }));
  };

  // 새 할일 추가
  const handleAddTask = () => {
    if (!newTask.title.trim()) return;

    const task: Task = {
      id: Date.now().toString(),
      title: newTask.title,
      description: newTask.description,
      completed: false,
      createdAt: new Date().toISOString().split("T")[0],
      createdBy: "현재 사용자",
    };

    setTasks((prev) => ({
      ...prev,
      [selectedDept]: [...(prev[selectedDept] || []), task],
    }));

    setNewTask({ title: "", description: "" });
    setIsAddingTask(false);
  };

  return (
    <div className={st.container}>
      {/* 상단 헤더 */}
      <div className={st.header}>
        <div className={st.headerTitle}>
          <h2>전체 할일</h2>
          <span className={st.subtitle}>팀별 작업 현황을 확인하세요</span>
        </div>
        {userRole === "admin" && (
          <button
            className={st.addButton}
            onClick={() => setIsAddingTask(true)}
          >
            <AddIcon fontSize="small" />
            새 할일 추가
          </button>
        )}
      </div>

      {/* 팀 선택 탭 */}
      <div className={st.departmentTabs}>
        {DEPARTMENTS.map((dept) => {
          const deptTasks = tasks[dept.name] || [];
          const deptCompleted = deptTasks.filter((t) => t.completed).length;
          const deptTotal = deptTasks.length;

          return (
            <button
              key={dept.id}
              className={`${st.tab} ${
                selectedDept === dept.name ? st.active : ""
              }`}
              onClick={() => setSelectedDept(dept.name)}
            >
              <span className={st.tabName}>{dept.displayName}</span>
              <span className={st.tabCount}>
                {deptCompleted}/{deptTotal}
              </span>
            </button>
          );
        })}
      </div>

      {/* 진행률 표시 */}
      <div className={st.progressSection}>
        <div className={st.progressInfo}>
          <span className={st.progressText}>
            진행률: {totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0}%
          </span>
          <span className={st.progressCount}>
            {completedCount} / {totalCount} 완료
          </span>
        </div>
        <div className={st.progressBar}>
          <div
            className={st.progressFill}
            style={{
              width: `${totalCount > 0 ? (completedCount / totalCount) * 100 : 0}%`,
            }}
          />
        </div>
      </div>

      {/* 할일 목록 */}
      <div className={st.taskList}>
        {currentTasks.length === 0 ? (
          <div className={st.emptyState}>
            <p>등록된 할일이 없습니다.</p>
            <span>새로운 할일을 추가해보세요!</span>
          </div>
        ) : (
          currentTasks.map((task) => (
            <div
              key={task.id}
              className={`${st.taskCard} ${task.completed ? st.completed : ""}`}
            >
              <div className={st.taskHeader}>
                <button
                  className={st.checkButton}
                  onClick={() => toggleTaskCompletion(task.id)}
                >
                  {task.completed ? (
                    <CheckCircleIcon className={st.checkedIcon} />
                  ) : (
                    <RadioButtonUncheckedIcon className={st.uncheckedIcon} />
                  )}
                </button>
                <div className={st.taskInfo}>
                  <h3 className={st.taskTitle}>{task.title}</h3>
                  <p className={st.taskDescription}>{task.description}</p>
                </div>
              </div>
              <div className={st.taskFooter}>
                <div className={st.taskMeta}>
                  <span className={st.taskAuthor}>{task.createdBy}</span>
                  <span className={st.taskDate}>{task.createdAt}</span>
                </div>
                {userRole === "admin" && (
                  <div className={st.taskActions}>
                    <button className={st.actionButton}>
                      <EditIcon fontSize="small" />
                    </button>
                    <button
                      className={st.actionButton}
                      onClick={() => deleteTask(task.id)}
                    >
                      <DeleteOutlineIcon fontSize="small" />
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))
        )}
      </div>

      {/* 할일 추가 모달 */}
      {isAddingTask && (
        <div className={st.modalOverlay} onClick={() => setIsAddingTask(false)}>
          <div className={st.modal} onClick={(e) => e.stopPropagation()}>
            <div className={st.modalHeader}>
              <h3>새 할일 추가</h3>
              <button
                className={st.closeButton}
                onClick={() => setIsAddingTask(false)}
              >
                ×
              </button>
            </div>
            <div className={st.modalBody}>
              <div className={st.formGroup}>
                <label>제목</label>
                <input
                  type="text"
                  placeholder="할일 제목을 입력하세요"
                  value={newTask.title}
                  onChange={(e) =>
                    setNewTask({ ...newTask, title: e.target.value })
                  }
                  autoFocus
                />
              </div>
              <div className={st.formGroup}>
                <label>설명</label>
                <textarea
                  placeholder="할일에 대한 설명을 입력하세요"
                  value={newTask.description}
                  onChange={(e) =>
                    setNewTask({ ...newTask, description: e.target.value })
                  }
                  rows={4}
                />
              </div>
            </div>
            <div className={st.modalFooter}>
              <button
                className={st.cancelButton}
                onClick={() => setIsAddingTask(false)}
              >
                취소
              </button>
              <button className={st.submitButton} onClick={handleAddTask}>
                추가
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
import { useState } from 'react';
import { curriculum, type Module, type Lesson } from '../data/curriculum';
import { useStore } from '../stores/appStore';
import { useProgress } from '../stores/progressStore';

export function LearningLab() {
  const [activeModule, setActiveModule] = useState<Module>(curriculum[0]);
  const [activeLesson, setActiveLesson] = useState<Lesson | null>(null);
  const setCode = useStore((s) => s.setCode);
  const { completeLesson, isCompleted, setCurrentLesson } = useProgress();
  const [showCheckpoint, setShowCheckpoint] = useState(false);
  const [checkpointAnswer, setCheckpointAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);

  const handleSelectLesson = (lesson: Lesson) => {
    setActiveLesson(lesson);
    setCurrentLesson(lesson.id);
    setShowCheckpoint(false);
    setCheckpointAnswer(null);
    setShowResult(false);
  };

  const handleLoadCode = () => {
    if (activeLesson) {
      setCode(activeLesson.code);
      completeLesson(activeLesson.id);
    }
  };

  const handleCheckpointAnswer = (index: number) => {
    setCheckpointAnswer(index);
    setShowResult(true);
    if (activeLesson?.checkpoint && index === activeLesson.checkpoint.correctIndex) {
      completeLesson(activeLesson.id);
    }
  };

  return (
    <div className="learning-lab">
      <div className="ll-sidebar">
        <h3>Curriculum</h3>
        {curriculum.map((mod) => (
          <div key={mod.id} className="ll-module">
            <div
              className={`ll-module-header ${activeModule.id === mod.id ? 'active' : ''}`}
              onClick={() => { setActiveModule(mod); setActiveLesson(null); }}
            >
              <span className="ll-level-badge">{mod.level}</span>
              <span>{mod.title}</span>
            </div>
            {activeModule.id === mod.id && (
              <div className="ll-lesson-list">
                {mod.lessons.map((lesson) => (
                  <div
                    key={lesson.id}
                    className={`ll-lesson-item ${activeLesson?.id === lesson.id ? 'active' : ''} ${isCompleted(lesson.id) ? 'completed' : ''}`}
                    onClick={() => handleSelectLesson(lesson)}
                  >
                    <span className="ll-check">{isCompleted(lesson.id) ? '✓' : '○'}</span>
                    <span>{lesson.title}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="ll-content">
        {!activeLesson && (
          <div className="ll-welcome">
            <h2>{activeModule.title}</h2>
            <p>{activeModule.description}</p>
            <p className="ll-hint">Select a lesson from the sidebar to begin</p>
          </div>
        )}

        {activeLesson && (
          <div className="ll-lesson">
            <h2>{activeLesson.title}</h2>
            <p className="ll-desc">{activeLesson.description}</p>

            <div className="ll-concepts">
              {activeLesson.concepts.map((c) => (
                <span key={c} className="ll-concept-tag">{c}</span>
              ))}
            </div>

            <pre className="ll-code">{activeLesson.code}</pre>
            <button className="load-btn" onClick={handleLoadCode}>Load Code & Mark Complete</button>

            {activeLesson.checkpoint && !showCheckpoint && (
              <button className="checkpoint-btn" onClick={() => setShowCheckpoint(true)}>
                Take Knowledge Check
              </button>
            )}

            {showCheckpoint && activeLesson.checkpoint && (
              <div className="ll-checkpoint">
                <h4>Knowledge Check</h4>
                <p>{activeLesson.checkpoint.question}</p>
                <div className="checkpoint-options">
                  {activeLesson.checkpoint.options.map((opt, i) => (
                    <button
                      key={i}
                      className={`checkpoint-option ${showResult && i === activeLesson.checkpoint!.correctIndex ? 'correct' : ''} ${showResult && checkpointAnswer === i && i !== activeLesson.checkpoint!.correctIndex ? 'wrong' : ''}`}
                      onClick={() => handleCheckpointAnswer(i)}
                      disabled={showResult}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
                {showResult && (
                  <p className="checkpoint-explanation">
                    {activeLesson.checkpoint.explanation}
                  </p>
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

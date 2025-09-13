import { useState } from "react";

// Each item being displayed within the list
export function TaskListItem({ name, description, date, tags, completed, onDelete, onComplete, onAddTag }: {
  name: string;
  description: string;
  date: Date | undefined;
  tags: string[];
  completed: boolean;
  onDelete: () => void;
  onComplete: () => void;
  onAddTag: (tag: string) => void;
}) {

  const [newTag, setNewTag] = useState('');
  const [isAddingTag, setIsAddingTag] = useState(false);

  return (
    <li>
      {/* name and description */}
      <div style={{ textAlign: 'left' }}>
        <h3 style={{ margin: 0, whiteSpace: 'normal', wordBreak: 'break-word' }}>{name}</h3>
        {/* Trim the time, just keep the date*/}
        <span id={"due-date"}> {date ? date.toUTCString().substring(0, date.toUTCString().length - 13) : ''}</span>
      </div>
      <p style={{ padding: '16px', whiteSpace: 'normal', wordBreak: 'break-word' }}>{description}</p>

      {/* Tags */}
      <div style={{ display: "flex", gap: "8px", marginBottom: "8px" }}>
        {tags.map((tag, index) => (
          <span key={index} className="task-tags">
            {tag}
          </span>
        ))}

        {isAddingTag ? (
          <input
            type="text"
            value={newTag}
            onChange={(e) => setNewTag(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && newTag.trim()) {
                onAddTag(newTag.trim());
                setNewTag("");
                setIsAddingTag(false);
              }
            }}
            onBlur={() => setIsAddingTag(false)}
            autoFocus
            style={{
              padding: "4px 8px",
              borderRadius: "12px",
              border: "1px solid #ccc",
            }}
          />
        ) : (
          <>
            {tags.length < 3 && <button
                onClick={() => setIsAddingTag(true)}
                className="add-item-button"
                style={{height: '30px'}}
              >
                + Add Tag
              </button>
            }
          </>
        )}
      </div>

      {/* Complete or Add */}
      <div className="button-container">
        <button onClick={onComplete} className="complete-button" disabled={completed}>
          {completed ? "Completed" : "Complete"}
        </button>
        <button onClick={onDelete} className="delete-button">
          Delete
        </button>
      </div>
      
    </li>
  );
}
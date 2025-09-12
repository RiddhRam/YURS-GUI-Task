import type { TaskListData } from '../types.tsx';

// Each item being displayed within the list
export function TaskListItem({ name, description, date, completed }: TaskListData) {
  return (
    <li style={{ justifySelf: 'center' }}>
      <div style={{ justifyItems: 'left' }}>
        <h3 style={{ margin: 0 }}>{name}</h3>
        <span style={{ color: '#55F' }}>{date.toUTCString().substring(0, date.toUTCString().length - 7)}</span>
      </div>
      <p style={{ marginTop: '8px' }}>{description}</p>
    </li>
  );
}
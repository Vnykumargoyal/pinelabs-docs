import { useState, useEffect } from "react";

export default function SchemaForm({ schema, onChange }) {
  const getDefaults = (schema) => {
    const defaults = {};
    Object.entries(schema.properties).forEach(([key, val]) => {
      if (val.default !== undefined) {
        defaults[key] = val.default;
      } else {
        defaults[key] = "";
      }
    });
    return defaults;
  };

  const [formData, setFormData] = useState(() => getDefaults(schema));

  useEffect(() => {
    onChange(getDefaults(schema));
  }, [schema, onChange]);

  const handleChange = (key, value) => {
    const updated = { ...formData, [key]: value };
    setFormData(updated);
    onChange(updated);
  };

  return (
    <div className="form">
      {Object.entries(schema.properties).map(([key, val]) => (
        <div key={key} className="form-group">
          <label>
            {key} {schema.required?.includes(key) && "*"}
          </label>

          <input
            type={val.type === "number" ? "number" : "text"}
            value={formData[key] || ""}
            onChange={(e) =>
              handleChange(
                key,
                val.type === "number" ? Number(e.target.value) : e.target.value
              )
            }
          />
        </div>
      ))}
    </div>
  );
}

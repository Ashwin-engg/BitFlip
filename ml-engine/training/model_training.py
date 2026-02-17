import pandas as pd
import numpy as np
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import accuracy_score, classification_report
import joblib

# Load dataset
df = pd.read_csv("ai4i2020.csv")

print("Dataset Loaded Successfully!\n")
print(df.head())

# Select important features
X = df[["Air temperature [K]", 
        "Process temperature [K]", 
        "Rotational speed [rpm]", 
        "Torque [Nm]", 
        "Tool wear [min]"]]

# Target column
y = df["Machine failure"]

# Split data (80% train, 20% test)
X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.2, random_state=42
)

# Feature Scaling
scaler = StandardScaler()
X_train = scaler.fit_transform(X_train)
X_test = scaler.transform(X_test)

# Create model
model = RandomForestClassifier()

# Train model
model.fit(X_train, y_train)

# Predictions
y_pred = model.predict(X_test)

# Accuracy
accuracy = accuracy_score(y_test, y_pred)
print("\nModel Accuracy:", accuracy)

print("\nClassification Report:\n")
print(classification_report(y_test, y_pred))

# Save trained model
joblib.dump(model, "cnc_fault_model.pkl")
print("\nModel saved successfully as cnc_fault_model.pkl")


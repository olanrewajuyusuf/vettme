export function getFilteredObjects(
  x: Record<string, any> = {},
  s: Record<string, any> = {},
  t: Record<string, any> = {},
  str: string,
  str2?: string,
  u?: Record<string, any>
): { claim?: any; finding?: any; data?: any; verdict: any }[] {
  console.log("Input Object x:", x);
  console.log("Filter Criteria - str:", str, "str2:", str2);

  // Step 1: Get key-value pairs based on filtering conditions
  const resultEntries = Object.entries(x)
    .filter(([key]) => {
      if (typeof str2 === "string") {
        return key.startsWith(str) && key.endsWith(str2);
      } else {
        return key.startsWith(str);
      }
    })
    .sort(([keyA], [keyB]) => {
      const priorityKeys = ['piFullname', 'giFullName1', 'giFullName2', 'giFullName3', 'giFullName4'];
      const aPriority = priorityKeys.includes(keyA) ? -1 : 0;
      const bPriority = priorityKeys.includes(keyB) ? -1 : 0;
      return aPriority - bPriority || keyA.localeCompare(keyB);
    });

  console.log("Filtered Entries:", resultEntries);

  // Step 2: Extract values from all parameters
  const resultValues = resultEntries.map(([_, value]) => value);
  const filteredSValues = resultEntries.map(([key]) => s[key]).filter(val => val !== undefined);
  const filteredTValues = resultEntries.map(([key]) => t[key]).filter(val => val !== undefined);

  // Ensure `u` is a valid object; otherwise, set all values to `false`
  const filteredUValues = resultEntries.map(([key]) => (u && typeof u === "object" ? u[key] : false));

  console.log("Result Values:", resultValues);
  console.log("Filtered S Values:", filteredSValues);
  console.log("Filtered T Values:", filteredTValues);
  console.log("Filtered U Values:", filteredUValues);

  // Step 3: Create array of objects with claim, findings, data, and extra
  const maxLength = Math.max(resultValues.length, filteredSValues.length, filteredTValues.length, filteredUValues.length);
  const items = Array.from({ length: maxLength }, (_, i) => ({
    claim: resultValues[i] ?? null,
    finding: filteredSValues[i] ?? null,
    data: filteredTValues[i] ?? null,
    verdict: filteredUValues[i] ?? false, // Ensure extra is `false` if no valid value
  }));

  console.log("Final Output:", items);
  return items;
}

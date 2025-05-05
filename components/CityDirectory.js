import Link from "next/link";
import { format } from "date-fns";
const todaysutc = format(new Date(), "MMM d, yyyy");

export default function CityDirectory({ cityData, cityName, citySlug }) {
  if (!cityData) return null;
  const { all_projects } = cityData;

  return (
    <div className="max-w-7xl mx-auto px-2 md:px-4 py-16">
      {/* Projects Table */}
      <div className="overflow-x-auto">
        <h2 className="text-base font-semibold text-gray-900 border-b border-gray-100">
          List of all pre construction homes in {cityName} | Last Updated{" "}
          {todaysutc}
        </h2>
        <p className="text-sm text-gray-500 mb-7">
          Showing results 1 - 100 of 1500
        </p>
        <div className="bg-white rounded-lg border border-gray-100 overflow-hidden">
          <table className="min-w-full">
            <thead>
              <tr className="border-b border-gray-100">
                <th className="px-3 py-2 text-left text-[10px] font-medium text-gray-500 uppercase tracking-wider w-8">
                  #
                </th>
                <th className="px-3 py-2 text-left text-[10px] font-medium text-gray-500 uppercase tracking-wider">
                  Project Name
                </th>
                <th className="hidden sm:table-cell px-3 py-2 text-left text-[10px] font-medium text-gray-500 uppercase tracking-wider">
                  Developer
                </th>
                <th className="hidden md:table-cell px-3 py-2 text-left text-[10px] font-medium text-gray-500 uppercase tracking-wider">
                  Type
                </th>
                <th className="px-3 py-2 text-left text-[10px] font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {all_projects.map((project, index) => (
                <tr key={project.id} className="hover:bg-gray-50">
                  <td className="px-3 py-2 whitespace-nowrap text-[10px] text-gray-500">
                    {index + 1}
                  </td>
                  <td className="px-3 py-2">
                    <Link
                      href={`/${citySlug}/${project.slug}`}
                      className="text-[11px] text-gray-900 hover:text-gray-600 block"
                    >
                      {project.project_name}
                    </Link>
                    <div className="sm:hidden text-[10px] text-gray-500 mt-0.5">
                      {project.developer_name}
                    </div>
                    <div className="md:hidden text-[10px] text-gray-500 mt-0.5">
                      {project.project_type}
                    </div>
                  </td>
                  <td className="hidden sm:table-cell px-3 py-2 whitespace-nowrap">
                    <Link
                      href={`/developers/${project.developer_name
                        .toLowerCase()
                        .replace(/\s+/g, "-")}`}
                      className="text-[11px] text-gray-900 hover:text-gray-600"
                    >
                      {project.developer_name}
                    </Link>
                  </td>
                  <td className="hidden md:table-cell px-3 py-2 whitespace-nowrap">
                    <span className="px-2 py-0.5 text-[10px] font-medium bg-gray-50 text-gray-900 rounded-lg">
                      {project.project_type}
                    </span>
                  </td>
                  <td className="px-3 py-2 whitespace-nowrap">
                    <span
                      className={`px-1.5 py-0.5 text-[10px] font-medium rounded-lg ${
                        project.status === "Selling"
                          ? "bg-green-50 text-green-700"
                          : project.status === "Upcoming"
                          ? "bg-blue-50 text-blue-700"
                          : project.status === "Planning Phase"
                          ? "bg-yellow-50 text-yellow-700"
                          : "bg-gray-50 text-gray-700"
                      }`}
                    >
                      {project.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
